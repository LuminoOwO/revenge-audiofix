import { ReactNative as RN } from "@vendetta/metro/common";
import { instead } from "@vendetta/patcher";

// Newer Discord builds expose the audio manager as a TurboModule
// ("NativeAudioManagerModule") instead of NativeModules.AudioManager.
// Try every known location, newest first.
function findAudioManager(): any {
  const turbo = (RN as any).TurboModuleRegistry;
  const native = RN.NativeModules as any;
  const candidates = [
    () => turbo?.get?.("NativeAudioManagerModule"),
    () => turbo?.get?.("RTNAudioManager"),
    () => native?.NativeAudioManagerModule,
    () => native?.RTNAudioManager,
    () => native?.AudioManager,
  ];

  for (const get of candidates) {
    try {
      const mod = get();
      if (mod && typeof mod.setCommunicationModeOn === "function") return mod;
    } catch {}
  }
  return null;
}

let unpatch: (() => void) | undefined;

export function onLoad() {
  const audioManager = findAudioManager();
  if (!audioManager) {
    console.log("[audiofix] Audio manager module not found, nothing patched");
    return;
  }
  unpatch = instead("setCommunicationModeOn", audioManager, () => {});
}

export function onUnload() {
  unpatch?.();
  unpatch = undefined;
}
