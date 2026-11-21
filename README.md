# Bluetooth Audio Fix (Revenge)

A fixed version of [redstonekasi's audiofix plugin](https://github.com/redstonekasi/vendetta-plugins/tree/main/plugins/audiofix) for the Revenge Discord mod on Android.

It stops Discord from switching your Bluetooth headset into hands-free (HFP) mode during calls, so you keep normal high-quality audio.

## Install

In Revenge, go to **Settings → Plugins → +** and paste:

```
https://raw.githubusercontent.com/LuminoOwO/revenge-audiofix/main/audiofix/
```

## What was fixed

The original plugin failed with `Failed to toggle: Cannot convert null value to object` on newer Discord versions. Discord moved its audio module from `NativeModules.AudioManager` to the TurboModule `NativeAudioManagerModule`, so the plugin was trying to patch an object that no longer existed.

This version looks the module up in `TurboModuleRegistry` first and falls back to the older locations, so it works on both new and old Discord builds. If the module can't be found at all, it logs a message instead of crashing.

## Layout

- `audiofix/`: the built plugin (`manifest.json` + `index.js`) that Revenge installs from
- `src/index.ts`: the source code

## Credits

Original plugin by [redstonekasi](https://github.com/redstonekasi), BSD 3-Clause licensed (see `LICENSE`).
