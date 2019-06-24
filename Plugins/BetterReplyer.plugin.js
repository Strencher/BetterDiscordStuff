//META {"name": "BetterReplyer", "source": "https://github.com/Zerthox/BetterDiscord-Plugins/blob/master/v1/BetterReplyer.plugin.js"} *//

/**
 * @author Zerthox
 * @version 4.0.8
 * @return {class} BetterReplyer Plugin class
 */
const BetterReplyer = (() => {

	// Api constants
	const {React, ReactDOM} = BdApi;

	/** Module storage */
	const Module = {
		Constants: BdApi.findModuleByProps("Permissions"),
		Permissions: BdApi.findModuleByProps("getChannelPermissions"),
		Drafts: BdApi.findModuleByProps("getDraft"),
		DraftActions: BdApi.findModuleByProps("saveDraft"),
		Users: BdApi.findModuleByProps("getUser", "getCurrentUser")
	};
	
	/** Component storage */
	const Component = {
		Message: BdApi.findModuleByProps("Message", "MessageAvatar").Message,
		ChannelTextArea: BdApi.findModule((m) => m.displayName === "ChannelTextArea")
	};

	/** Selector storage */
	const Selector = {
		Messages: BdApi.findModuleByProps("message", "container", "headerCozy"),
		TextArea: BdApi.findModuleByProps("channelTextArea")
	};

	/** Storage for Patches */
	const Patches = {};

	// return plugin class
	return class BetterReplyer {

		/**
		 * @return {string} Plugin name
		 */
		getName() {
			return "BetterReplyer";
		}

		/**
		 * @return {string} Plugin version
		 */
		getVersion() {
			return "4.0.8";
		}

		/**
		 * @return {string} Plugin author
		 */
		getAuthor() {
			return "Zerthox";
		}

		/**
		 * @return {string} Plugin description
		 */
		getDescription() {
			return "Reply to people using their ID with a button.\n Inspired by Replyer by @Hammmock#3110, @Natsulus#0001 & @Zerebos#7790.";
		}

		/**
		 * Print a message in Console
		 * @param {string} msg message
		 * @param {function} [log=console.log] log function to call
		 */
		log(msg, log = console.log) {
			log(`%c[${this.getName()}] %c(v${this.getVersion()})%c ${msg}`, "color: #3a71c1; font-weight: 700;", "color: #666; font-size: .8em;", "");
		}

		/**
		 * Plugin constructor
		 */
		constructor() {
			this.focused = null;
			this.selection = [0, 0];
			this.mode = false;
		}
		
		/**
		 * Plugin start function
		 */
		start() {

			// inject styles
			BdApi.injectCSS(this.getName(),
				`/* BetterReplyer CSS */
				.replyer {
					position: relative;
					top: -1px;
					margin-left: 5px;
					padding: 3px 5px;
					background: rgba(0, 0, 0, 0.4);
					border-radius: 3px;
					color: #fff !important;
					font-size: 10px;
					text-transform: uppercase;
					cursor: pointer;
				}
				.${Selector.Messages.container.split(" ")[0]}:not(:hover) .replyer {
					visibility: hidden;
				}`
			);
			
			// patch "Message" component render function
			Patches.message = BdApi.monkeyPatch(Component.Message.prototype, "render", {silent: true, after: (d) => {

				// get this & old return value
				const t = d.thisObject,
					r = d.returnValue;

				// get message author id
				const id = t.props.message.author.id;

				// return unmodified if disabled, compact, no header or author is current user
				if (t.props.isDisabled || t.props.isCompact || !t.props.isHeader || id === Module.Users.getCurrentUser().id) {
					return r;
				}

				// get current channel permissions
				const p = Module.Permissions.getChannelPermissions(t.props.channel.id);

				// return unmodified if no permissions to send messages
				if (typeof p === "number" && !(p & Module.Constants.Permissions.SEND_MESSAGES)) {
					return r;
				}
				
				// find message header
				const h = [t.props.jumpSequenceId ? r.props.children.props.children : r.props.children].flat().find((e) => e.props && e.props.className === Selector.Messages.headerCozy);
				
				// find message header meta
				const m = h && [h.props.children].flat().find((e) => e.props && e.props.className === Selector.Messages.headerCozyMeta);

				
				// check if message header meta found
				if (m) {

					// get children
					const c = [m.props.children].flat();

					// push reply button
					c.push(React.createElement("span", {
						className: "replyer",
						onClick: () => {

							// get saved text area
							const f = this.focused;

							// check if text area saved
							if (f) {

								// focus textarea
								f.focus();

								// check mode
								if (this.mode) {

									// select saved selection
									f.setSelectionRange(this.selection[0], this.selection[1]);

									// insert mention
									document.execCommand("insertText", false, `<@!${id}>`);

									// update saved text area
									setTimeout(() => {
										this.focused = f;
									}, 100);
								}
								else {

									// get mention
									const m = `<@!${id}> `;
								
									// go to start of textarea
									f.setSelectionRange(0, 0);
								
									// insert mention
									document.execCommand("insertText", false, m);
								
									// select saved selection
									f.setSelectionRange(this.selection[0] + m.length, this.selection[1] + m.length); 
								}
							}
							else {

								// default to current channel
								Module.DraftActions.saveDraft(t.props.channel.id, `<@!${id}> ${Module.Drafts.getDraft(t.props.channel.id)}`);
							}
						}
					}, "Reply"));

					// override children
					m.props.children = c;
				}

				// return modified return value
				return r;
			}});
			this.log("Patched render of Message component");

			// patch "ChannelTextArea" component render function
			Patches.textarea = BdApi.monkeyPatch(Component.ChannelTextArea.prototype, "render", {silent: true, instead: (d) => {

				// get this
				const t = d.thisObject;

				// declare blur handler
				const f = () => {

					// get dom node
					const e = ReactDOM.findDOMNode(d.thisObject).querySelector("textarea");

					// save focused textarea
					this.focused = e;

					// save selection
					this.selection = [e.selectionStart, e.selectionEnd];

					// set mode
					this.mode = true;

					// reset mode after 100ms
					setTimeout(() => {
						if (this.focused === e) {
							this.mode = false;
						}
					}, 100);
				};

				// check if text area has a blur handler
				if (t.props.onBlur) {
					
					// patch blur handler
					BdApi.monkeyPatch(t.props, "onBlur", {silent: true, before: f});
				}
				else {

					// assign blur handler
					t.props.onBlur = f;
				}

				// return render with modified this
				return d.originalMethod.apply(t);
			}});
			this.log("Patched onBlur of ChannelTextArea component");
			
			// force update
			this.forceUpdateAll();
			
			// console output
			this.log("Enabled");
		}
		
		/**
		 * Plugin stop function
		 */
		stop() {

			// reset saved text area, selection & mode
			this.focused = null;
			this.selection = [0, 0];
			this.mode = false;

			// clear styles
			BdApi.clearCSS(this.getName());

			// revert all patches
			for (const k in Patches) {
				Patches[k]();
				delete Patches[k];
			}
			this.log("Unpatched all");

			// force update
			this.forceUpdateAll();

			// console output
			this.log("Disabled");
		}

		/**
		 * Force update the "Message" & "ChannelTextArea" component state nodes
		 */
		forceUpdateAll() {

			// catch errors
			try {

				// force update messages
				for (const e of document.getElementsByClassName(Selector.Messages.message)) {
					const i = BdApi.getInternalInstance(e);
					i && i.return.stateNode.forceUpdate && i.return.stateNode.forceUpdate();
				}
			}
			catch(e) {

				// log error
				this.log("Failed to force update Message nodes", console.warn);
				console.error(e);
			}
			
			// catch errors
			try {

				// force update channel text areas
				for (const e of document.getElementsByClassName(Selector.TextArea.channelTextArea)) {
					const i = BdApi.getInternalInstance(e);
					i && i.return.stateNode.forceUpdate && i.return.stateNode.forceUpdate();
				}
			}
			catch(e) {

				// log error
				this.log("Failed to force update ChannelTextArea nodes", console.warn);
				console.error(e);
			}
		}

	};
})();