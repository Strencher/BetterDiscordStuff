# BetterDiscordStuff

## Development Branch

> [!WARNING]
> This branch contains the **source code** for BetterDiscord plugins. It is **NOT** the compiled or ready-to-use plugin.

## Developer Guide

### Building from Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/Strencher/BetterDiscordStuff.git
   cd BetterDiscordStuff
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Compile the plugin**

   ```bash
   pnpm build --watch --install --plugins PlatformIndicator
   ```

#### Available Flags

| Flag        | Description                                                          |
| ----------- | -------------------------------------------------------------------- |
| `--watch`   | Watch for file changes and automatically recompile                   |
| `--install` | Install the plugin directly to your BetterDiscord Plugins folder     |
| `--publish` | Prepare a folder with the compiled plugin and README for main branch |
| `--plugins` | Specify which plugin(s) to compile (requires folder name)            |

## Pull Request Guidelines

To ensure your PR is reviewed quickly:

* Base all PRs on the `development` branch
* Keep PRs **focused** (one feature or fix per PR)
* Use **clear and descriptive commit messages**
* Do **not** commit compiled/dist files unless explicitly requested
* Ensure the plugin **builds and works** before submitting
* Update plugin metadata: **Version**, **Changelog**, and **Update-Date**
