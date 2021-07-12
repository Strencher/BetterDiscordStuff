/// <reference path="../bdbuilder/typings/main.d.ts" />

import BasePlugin from '@zlibrary/plugin';
import { Patcher, Utilities, WebpackModules } from '@zlibrary';
import BannerStore, { banner } from './bannerStore';
import Settings from './settings';
import { useStateFromStores } from '@discord/flux';
import _ from 'lodash';
import { joinClassNames } from '@discord/utils';
import { switchCase } from 'common/util/any';
import ErrorBoundary from 'common/components/errorboundary';
import React, { useState } from 'react';
import styles from './banner.scss';
import stylesheet from 'styles';
import { Button } from '@discord/components';
import { Colors } from '@discord/constants';

type UserBanner = {
  BannerTypes: {
    0: 'POPOUT';
    1: 'PROFILE';
    POPOUT: 0;
    PROFILE: 1;
  }
  default: () => any;
};

const Arrow: any = ErrorBoundary.from(WebpackModules.getByDisplayName("Arrow"), "Arrow");
const TextBadge: any = ErrorBoundary.from(WebpackModules.getByProps("TextBadge")?.TextBadge);

export default class UserBackgrounds extends BasePlugin {
  public modifiedUsers: Set<string> = new Set<string>();
  public Store = BannerStore;

  public onStart() {
    stylesheet.inject();
    BannerStore.initialize();
    Utilities.suppressErrors(this.patchBanners.bind(this), 'UserBanner.default patch')();
    Utilities.suppressErrors(this.patchUserPopout.bind(this), 'UserPopoutContainer.type patch')();
  }


  public shouldShow(type: 1 | 2): boolean {
    return switchCase(type, [
      [0, Settings.get('showInPopout', true)],
      [1, Settings.get('showInProfile', true)]
    ], false);
  }

  public async patchUserPopout(): Promise<void> {
    const UserPopout = WebpackModules.getByProps('UserPopoutAvatar');
    const classes: {
      avatarPositionNormal: string;
      avatarPositionPremium: string;
    } = WebpackModules.getByProps('avatarPositionNormal');

    Patcher.after(UserPopout, 'UserPopoutAvatar', (_, [{ user }], res) => {
      console.log(res);
      const props = res?.props?.children?.props;
      if (!props || props.className?.indexOf?.(classes.avatarPositionPremium) > -1 || !BannerStore.hasBanner(user.id)) return;

      props.className = props.className.replace(classes.avatarPositionNormal, classes.avatarPositionPremium);
    });
  }

  public async patchBanners(): Promise<void> {
    const BannerClases: any = WebpackModules.getByProps('banner', 'popoutBanner');
    const UserBanner: UserBanner = WebpackModules.getModule(m => m.default.displayName === 'UserBanner');

    type params = [
      {
        user: UserObject;
        bannerType: 1 | 2;
        guildId: void | string;
        onClose: () => void;
      }
    ];

    Patcher.after(UserBanner, 'default', (__, [{ user, bannerType }]: params, res) => {
      const [selection, setSelection] = useState(0);
      const banner: banner = useStateFromStores([BannerStore], () => BannerStore.getBanner(user.id), null, _.isEqual);

      if (!banner || (user.banner && !banner)) return;
      res.props['data-user-id'] = user.id; // make theme devs happy

      res.props.className = switchCase<string>(bannerType, [
        [0, joinClassNames("user-background", BannerClases.banner, BannerClases.popoutBannerPremium)],
        [1, joinClassNames("user-background", BannerClases.banner, BannerClases.profileBannerPremium)]
      ]);

      res.props.style = {
        backgroundImage: `url(${selection === 1 ? user.bannerURL : banner?.background})`,
        backgroundPosition: selection === 0 && banner?.orientation
      };

      if (res.props.children[0]) res.props.children[0] = null;

      const handleBannerSelect = (index: 1 | 0) => () => {
        setSelection(index);
      };

      return (
        <div className={styles.container}>
          <TextBadge color={Colors.BRAND_NEW_500} text={selection === 0 ? "USRBG" : "NATIVE"} className={styles.badge} />
          {
            user.banner && (
              <Button
                className={joinClassNames(styles.arrow, styles.left)}
                key="left"
                look={Button.Looks.BLANK}
                size={Button.Sizes.TINY}
                onClick={handleBannerSelect(0)}
                disabled={selection === 0}
              >
                <Arrow direction={Arrow.Directions.LEFT} />
              </Button>
            )
          }
          {res}
          {
            user.banner && (
              <Button
                className={joinClassNames(styles.arrow, styles.right)}
                key="right"
                look={Button.Looks.BLANK}
                size={Button.Sizes.TINY}
                onClick={handleBannerSelect(1)}
                disabled={selection === 1}
              >
                <Arrow direction={Arrow.Directions.RIGHT} key="right" />
              </Button>
            )
          }
        </div>
      );
    });
  }

  public onStop() {
    stylesheet.remove();
    Patcher.unpatchAll();
    BannerStore.destroy();
  }
}