# Contributing to BetterDiscordStuff

Thanks for taking the time to contribute. This repository contains the source code for BetterDiscord plugins on the `development` branch. It is not the compiled or ready-to-use plugin branch.

## Before You Start

- Use the `development` branch as the base for your work.
- Keep each pull request focused on one feature or fix.
- Check existing issues and pull requests before opening a new one.
- For support questions, use the support server linked in the issue form.

## Reporting Bugs

Please use the bug report issue template and include:

- The affected plugin.
- A clear description of the bug.
- Screenshots or videos when they help explain the issue.
- Console errors or stacktraces when available.

Before submitting a bug report, confirm that you are using the latest version of the plugin and that the issue has not already been reported.

## Development Setup

1. Fork and clone the repository.

   ```bash
   git clone https://github.com/Strencher/BetterDiscordStuff.git
   cd BetterDiscordStuff
   ```

2. Enable pnpm via Corepack.

   ```bash
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

3. Install dependencies.

   ```bash
   pnpm install
   ```

4. Build the plugin you are working on.

   ```bash
   pnpm build --watch --install --plugins PluginName
   ```

   Available flags:

   | Flag        | Description                                                          |
   | ----------- | -------------------------------------------------------------------- |
   | `--watch`   | Watch for file changes and automatically recompile                   |
   | `--install` | Install the plugin directly to your BetterDiscord Plugins folder     |
   | `--publish` | Prepare a folder with the compiled plugin and README for main branch |
   | `--plugins` | Specify which plugin(s) to compile (requires folder name)            |

## Pull Request Guidelines

To make reviews faster, please make sure your pull request follows these rules:

- Base all pull requests on the `development` branch.
- Keep pull requests focused on one feature or fix.
- Use clear and descriptive commit messages.
- Do not commit compiled or dist files unless explicitly requested.
- Ensure the plugin builds and works before submitting.
- Update plugin metadata: Version, Changelog, and Update-Date.

## Quality Checks

Before opening a pull request, run:

```bash
pnpm lint
```

If your change affects plugin behavior, also build and test the affected plugin locally:

```bash
pnpm build --plugins PluginName
```

## Plugin Metadata

When changing a plugin, update its metadata as needed:

- Version
- Changelog
- Update-Date

Only update metadata for plugins that are affected by your change.

## Review Process

After you open a pull request, GitHub Actions will run linting, formatting, and plugin build checks. A maintainer may ask for changes before merging. Please keep the pull request up to date and respond to review comments when you can.
