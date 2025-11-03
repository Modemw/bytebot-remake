import {
  Camera01Icon,
  User03Icon,
  Cursor02Icon,
  TypeCursorIcon,
  MouseRightClick06Icon,
  TimeQuarter02Icon,
  BrowserIcon,
  FilePasteIcon,
  FileIcon,
} from "@hugeicons/core-free-icons";
import {
  ComputerToolUseContentBlock,
  isScreenshotToolUseBlock,
  isWaitToolUseBlock,
  isTypeKeysToolUseBlock,
  isTypeTextToolUseBlock,
  isPressKeysToolUseBlock,
  isMoveMouseToolUseBlock,
  isScrollToolUseBlock,
  isCursorPositionToolUseBlock,
  isClickMouseToolUseBlock,
  isDragMouseToolUseBlock,
  isPressMouseToolUseBlock,
  isTraceMouseToolUseBlock,
  isApplicationToolUseBlock,
  isPasteTextToolUseBlock,
  isReadFileToolUseBlock,
} from "@bytebot/shared";
import { TranslationFunction } from "@/contexts/LanguageContext";

// Define the IconType for proper type checking
export type IconType =
  | typeof Camera01Icon
  | typeof User03Icon
  | typeof Cursor02Icon
  | typeof TypeCursorIcon
  | typeof MouseRightClick06Icon
  | typeof TimeQuarter02Icon
  | typeof BrowserIcon
  | typeof FilePasteIcon
  | typeof FileIcon;

export function getIcon(block: ComputerToolUseContentBlock): IconType {
  if (isScreenshotToolUseBlock(block)) {
    return Camera01Icon;
  }

  if (isWaitToolUseBlock(block)) {
    return TimeQuarter02Icon;
  }

  if (
    isTypeKeysToolUseBlock(block) ||
    isTypeTextToolUseBlock(block) ||
    isPressKeysToolUseBlock(block)
  ) {
    return TypeCursorIcon;
  }

  if (isPasteTextToolUseBlock(block)) {
    return FilePasteIcon;
  }

  if (
    isMoveMouseToolUseBlock(block) ||
    isScrollToolUseBlock(block) ||
    isCursorPositionToolUseBlock(block) ||
    isClickMouseToolUseBlock(block) ||
    isDragMouseToolUseBlock(block) ||
    isPressMouseToolUseBlock(block) ||
    isTraceMouseToolUseBlock(block)
  ) {
    if (block.input.button === "right") {
      return MouseRightClick06Icon;
    }

    return Cursor02Icon;
  }

  if (isApplicationToolUseBlock(block)) {
    return BrowserIcon;
  }

  if (isReadFileToolUseBlock(block)) {
    return FileIcon;
  }

  return User03Icon;
}

export function getLabel(
  block: ComputerToolUseContentBlock,
  t: TranslationFunction,
) {
  if (isScreenshotToolUseBlock(block)) {
    return t("computerTool.labels.screenshot");
  }

  if (isWaitToolUseBlock(block)) {
    return t("computerTool.labels.wait");
  }

  if (isTypeKeysToolUseBlock(block)) {
    return t("computerTool.labels.keys");
  }

  if (isTypeTextToolUseBlock(block)) {
    return t("computerTool.labels.type");
  }

  if (isPasteTextToolUseBlock(block)) {
    return t("computerTool.labels.paste");
  }

  if (isPressKeysToolUseBlock(block)) {
    return t("computerTool.labels.pressKeys");
  }

  if (isMoveMouseToolUseBlock(block)) {
    return t("computerTool.labels.moveMouse");
  }

  if (isScrollToolUseBlock(block)) {
    return t("computerTool.labels.scroll");
  }

  if (isCursorPositionToolUseBlock(block)) {
    return t("computerTool.labels.cursorPosition");
  }

  if (isClickMouseToolUseBlock(block)) {
    const button = block.input.button;
    if (button === "left") {
      if (block.input.clickCount === 2) {
        return t("computerTool.labels.doubleClick");
      }

      if (block.input.clickCount === 3) {
        return t("computerTool.labels.tripleClick");
      }

      return t("computerTool.labels.click");
    }

    const buttonLabel = button
      ? t(`computerTool.buttons.${button}` as const)
      : "";
    return t("computerTool.labels.buttonClick", {
      button: buttonLabel || button || "",
    });
  }

  if (isDragMouseToolUseBlock(block)) {
    return t("computerTool.labels.drag");
  }

  if (isPressMouseToolUseBlock(block)) {
    return t("computerTool.labels.pressMouse");
  }

  if (isTraceMouseToolUseBlock(block)) {
    return t("computerTool.labels.traceMouse");
  }

  if (isApplicationToolUseBlock(block)) {
    return t("computerTool.labels.openApplication");
  }

  if (isReadFileToolUseBlock(block)) {
    return t("computerTool.labels.readFile");
  }

  return t("computerTool.labels.unknown");
}

export function getDirectionLabel(
  direction: string | undefined,
  t: TranslationFunction,
): string {
  if (!direction) {
    return "";
  }
  const key = `computerTool.directions.${direction}` as const;
  const translated = t(key);
  return translated || direction;
}

export function getApplicationLabel(
  application: string | undefined,
  t: TranslationFunction,
): string {
  if (!application) {
    return "";
  }

  const key = `computerTool.applications.${application}` as const;
  const translated = t(key);
  return translated || application;
}
