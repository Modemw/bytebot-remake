export type Language = "en" | "zh-CN" | "zh-TW";

export interface LanguageDefinition {
  code: Language;
  label: string;
  nativeLabel: string;
  shortLabel: string;
}

export const LANGUAGES: LanguageDefinition[] = [
  { code: "en", label: "English", nativeLabel: "English", shortLabel: "EN" },
  { code: "zh-CN", label: "Simplified Chinese", nativeLabel: "简体中文", shortLabel: "简" },
  { code: "zh-TW", label: "Traditional Chinese", nativeLabel: "繁體中文", shortLabel: "繁" },
];

export const fallbackLanguage: Language = "en";

type TranslationValues = string | { [key: string]: TranslationValues };

export const translations: Record<Language, Record<string, TranslationValues>> = {
  en: {
    common: {
      language: "Language",
      loading: "Loading...",
      cancel: "Cancel",
    },
    header: {
      home: "Home",
      tasks: "Tasks",
      desktop: "Desktop",
      docs: "Docs",
      logoAlt: "Bytebot Logo",
      docsAria: "Open Bytebot documentation in a new tab",
    },
    home: {
      title: "What can I help you get done?",
      modelPlaceholder: "Select a model",
      latestTasksTitle: "Latest Tasks",
      latestTasksDescription:
        "You'll see tasks that are completed, scheduled, or require your attention.",
      stockAlt: "Bytebot stock image",
    },
    chatInput: {
      defaultPlaceholder: "Give Bytebot a task to work on...",
      detailsPlaceholder: "Add more details to your task...",
      maxFiles: "Maximum {{count}} files allowed",
      filesExceedLimit: "File(s) exceed 30MB limit: {{files}}",
      fileCounter: "{{count}} / {{max}} files",
      maxPerFile: "Max 30MB per file",
    },
    chatContainer: {
      working: "Bytebot is working...",
      noMessages: "No messages yet...",
    },
    tasksPage: {
      title: "Tasks",
      loading: "Loading tasks...",
      emptyTitle: "No tasks yet",
      emptyDescription: "Get started by creating a first task",
      newTask: "+ New Task",
    },
    taskTabs: {
      all: "All",
      active: "Active",
      completed: "Completed",
      cancelledFailed: "Cancelled/Failed",
    },
    taskList: {
      title: "Latest Tasks",
      description:
        "You'll see tasks that are completed, scheduled, or require your attention.",
      loading: "Loading tasks...",
      empty: "No tasks available",
      emptyHint: "Your completed tasks will appear here",
    },
    taskItem: {
      today: "Today",
      formatFull: "MMMM d, yyyy h:mma",
      formatToday: "'Today' h:mma",
    },
    desktop: {
      takeOver: "Take Over",
      proceed: "Proceed",
      cancel: "Cancel",
      status: {
        liveView: {
          title: "Live Desktop View",
          subtext: "",
          alt: "Live view status",
        },
        running: {
          title: "Running",
          subtext: "Task in progress",
          alt: "Running status",
        },
        needsAttention: {
          title: "Needs Attention",
          subtext: "Task needs attention",
          alt: "Needs attention status",
        },
        failed: {
          title: "Failed",
          subtext: "Task failed",
          alt: "Failed status",
        },
        canceled: {
          title: "Canceled",
          subtext: "Task canceled",
          alt: "Canceled status",
        },
        pending: {
          title: "Pending",
          subtext: "Task pending",
          alt: "Pending status",
        },
        userControl: {
          title: "Running",
          subtext: "You took control",
          alt: "User control status",
        },
        completed: {
          title: "Completed",
          subtext: "Task completed",
          alt: "Completed status",
        },
      },
    },
    screenshots: {
      noneTitle: "No screenshots available",
      noneDescription: "Screenshots will appear here when the task has run",
      alt: "Task screenshot",
    },
    assistant: {
      tookControl: "You took control",
    },
    pagination: {
      summary: "Showing {{start}} to {{end}} of {{total}} results",
      previous: "Previous",
      next: "Next",
    },
    languageSwitcher: {
      english: "English",
      simplified: "Simplified Chinese",
      traditional: "Traditional Chinese",
    },
    loader: {
      alt: "Loading...",
    },
    messageAvatar: {
      assistantAlt: "Bytebot",
    },
    screenshot: {
      noScreenshots: "No screenshots available",
    },
    chat: {
      bytebotWorking: "Bytebot is working...",
    },
    computerTool: {
      labels: {
        screenshot: "Screenshot",
        wait: "Wait",
        keys: "Keys",
        type: "Type",
        paste: "Paste",
        pressKeys: "Press Keys",
        moveMouse: "Move Mouse",
        scroll: "Scroll",
        cursorPosition: "Cursor Position",
        click: "Click",
        doubleClick: "Double Click",
        tripleClick: "Triple Click",
        buttonClick: "{{button}} Click",
        drag: "Drag",
        pressMouse: "Press Mouse",
        traceMouse: "Trace Mouse",
        openApplication: "Open Application",
        readFile: "Read File",
        unknown: "Unknown",
      },
      buttons: {
        left: "Left",
        right: "Right",
        middle: "Middle",
      },
      details: {
        from: "From",
        to: "To",
        scroll: "{{direction}} {{count}}",
      },
      directions: {
        up: "Up",
        down: "Down",
        left: "Left",
        right: "Right",
        none: "None",
      },
      applications: {
        firefox: "Firefox",
        "1password": "1Password",
        thunderbird: "Thunderbird",
        vscode: "Visual Studio Code",
        terminal: "Terminal",
        directory: "File Manager",
        desktop: "Desktop",
      },
    },
  },
  "zh-CN": {
    common: {
      language: "语言",
      loading: "加载中...",
      cancel: "取消",
    },
    header: {
      home: "主页",
      tasks: "任务",
      desktop: "桌面",
      docs: "文档",
      logoAlt: "Bytebot 标志",
      docsAria: "在新标签页中打开 Bytebot 文档",
    },
    home: {
      title: "我能帮你完成什么任务？",
      modelPlaceholder: "选择一个模型",
      latestTasksTitle: "最新任务",
      latestTasksDescription: "您将在此看到已完成、已安排或需要您关注的任务。",
      stockAlt: "Bytebot 宣传图",
    },
    chatInput: {
      defaultPlaceholder: "请给 Bytebot 一个要执行的任务...",
      detailsPlaceholder: "补充更多任务细节...",
      maxFiles: "最多可上传 {{count}} 个文件",
      filesExceedLimit: "文件超过 30MB 限制：{{files}}",
      fileCounter: "{{count}} / {{max}} 个文件",
      maxPerFile: "每个文件最大 30MB",
    },
    chatContainer: {
      working: "Bytebot 正在处理...",
      noMessages: "还没有消息...",
    },
    tasksPage: {
      title: "任务",
      loading: "正在加载任务...",
      emptyTitle: "还没有任务",
      emptyDescription: "创建第一个任务开始使用",
      newTask: "+ 新建任务",
    },
    taskTabs: {
      all: "全部",
      active: "进行中",
      completed: "已完成",
      cancelledFailed: "已取消/失败",
    },
    taskList: {
      title: "最新任务",
      description: "您将在此看到已完成、已安排或需要您关注的任务。",
      loading: "正在加载任务...",
      empty: "暂无任务",
      emptyHint: "完成的任务会显示在这里",
    },
    taskItem: {
      today: "今天",
      formatFull: "yyyy年M月d日 a h:mm",
      formatToday: "'今天' a h:mm",
    },
    desktop: {
      takeOver: "接管",
      proceed: "继续",
      cancel: "取消",
      status: {
        liveView: {
          title: "实时桌面视图",
          subtext: "",
          alt: "实时视图状态",
        },
        running: {
          title: "运行中",
          subtext: "任务进行中",
          alt: "运行状态",
        },
        needsAttention: {
          title: "需要关注",
          subtext: "任务需要处理",
          alt: "需要关注状态",
        },
        failed: {
          title: "失败",
          subtext: "任务失败",
          alt: "失败状态",
        },
        canceled: {
          title: "已取消",
          subtext: "任务已取消",
          alt: "取消状态",
        },
        pending: {
          title: "等待中",
          subtext: "任务等待执行",
          alt: "等待状态",
        },
        userControl: {
          title: "运行中",
          subtext: "你已接管控制",
          alt: "用户接管状态",
        },
        completed: {
          title: "已完成",
          subtext: "任务已完成",
          alt: "完成状态",
        },
      },
    },
    screenshots: {
      noneTitle: "暂无截图",
      noneDescription: "任务运行后将显示截图",
      alt: "任务截图",
    },
    assistant: {
      tookControl: "你已接管控制",
    },
    pagination: {
      summary: "显示第 {{start}} 条到第 {{end}} 条，共 {{total}} 条结果",
      previous: "上一页",
      next: "下一页",
    },
    languageSwitcher: {
      english: "English",
      simplified: "简体中文",
      traditional: "繁體中文",
    },
    loader: {
      alt: "加载中...",
    },
    messageAvatar: {
      assistantAlt: "Bytebot",
    },
    screenshot: {
      noScreenshots: "暂无截图",
    },
    chat: {
      bytebotWorking: "Bytebot 正在处理...",
    },
    computerTool: {
      labels: {
        screenshot: "截图",
        wait: "等待",
        keys: "按键",
        type: "输入",
        paste: "粘贴",
        pressKeys: "组合键",
        moveMouse: "移动鼠标",
        scroll: "滚动",
        cursorPosition: "光标位置",
        click: "单击",
        doubleClick: "双击",
        tripleClick: "三击",
        buttonClick: "{{button}} 点击",
        drag: "拖拽",
        pressMouse: "按下鼠标",
        traceMouse: "轨迹",
        openApplication: "打开应用",
        readFile: "读取文件",
        unknown: "未知",
      },
      buttons: {
        left: "左键",
        right: "右键",
        middle: "中键",
      },
      details: {
        from: "起点",
        to: "终点",
        scroll: "{{direction}}{{count}} 次",
      },
      directions: {
        up: "向上",
        down: "向下",
        left: "向左",
        right: "向右",
        none: "无",
      },
      applications: {
        firefox: "Firefox",
        "1password": "1Password",
        thunderbird: "Thunderbird",
        vscode: "Visual Studio Code",
        terminal: "终端",
        directory: "文件管理器",
        desktop: "桌面",
      },
    },
  },
  "zh-TW": {
    common: {
      language: "語言",
      loading: "載入中...",
      cancel: "取消",
    },
    header: {
      home: "首頁",
      tasks: "任務",
      desktop: "桌面",
      docs: "文件",
      logoAlt: "Bytebot 標誌",
      docsAria: "在新分頁中開啟 Bytebot 文件",
    },
    home: {
      title: "我能幫你完成什麼任務？",
      modelPlaceholder: "選擇一個模型",
      latestTasksTitle: "最新任務",
      latestTasksDescription: "您將在此看到已完成、已排程或需要您關注的任務。",
      stockAlt: "Bytebot 宣傳圖",
    },
    chatInput: {
      defaultPlaceholder: "請給 Bytebot 一個要執行的任務...",
      detailsPlaceholder: "補充更多任務細節...",
      maxFiles: "最多可上傳 {{count}} 個檔案",
      filesExceedLimit: "檔案超過 30MB 限制：{{files}}",
      fileCounter: "{{count}} / {{max}} 個檔案",
      maxPerFile: "單個檔案上限 30MB",
    },
    chatContainer: {
      working: "Bytebot 正在處理...",
      noMessages: "還沒有訊息...",
    },
    tasksPage: {
      title: "任務",
      loading: "正在載入任務...",
      emptyTitle: "還沒有任務",
      emptyDescription: "建立第一個任務開始使用",
      newTask: "+ 新建任務",
    },
    taskTabs: {
      all: "全部",
      active: "進行中",
      completed: "已完成",
      cancelledFailed: "已取消/失敗",
    },
    taskList: {
      title: "最新任務",
      description: "您將在此看到已完成、已排程或需要您關注的任務。",
      loading: "正在載入任務...",
      empty: "暫無任務",
      emptyHint: "完成的任務會顯示在這裡",
    },
    taskItem: {
      today: "今日",
      formatFull: "yyyy年M月d日 a h:mm",
      formatToday: "'今日' a h:mm",
    },
    desktop: {
      takeOver: "接管",
      proceed: "繼續",
      cancel: "取消",
      status: {
        liveView: {
          title: "即時桌面視圖",
          subtext: "",
          alt: "即時視圖狀態",
        },
        running: {
          title: "執行中",
          subtext: "任務處理中",
          alt: "執行狀態",
        },
        needsAttention: {
          title: "需要注意",
          subtext: "任務需要處理",
          alt: "需要注意狀態",
        },
        failed: {
          title: "失敗",
          subtext: "任務失敗",
          alt: "失敗狀態",
        },
        canceled: {
          title: "已取消",
          subtext: "任務已取消",
          alt: "取消狀態",
        },
        pending: {
          title: "等待中",
          subtext: "任務等待執行",
          alt: "等待狀態",
        },
        userControl: {
          title: "執行中",
          subtext: "你已接管控制",
          alt: "使用者接管狀態",
        },
        completed: {
          title: "已完成",
          subtext: "任務已完成",
          alt: "完成狀態",
        },
      },
    },
    screenshots: {
      noneTitle: "暫無截圖",
      noneDescription: "任務執行後會顯示截圖",
      alt: "任務截圖",
    },
    assistant: {
      tookControl: "你已接管控制",
    },
    pagination: {
      summary: "顯示第 {{start}} 筆到第 {{end}} 筆，共 {{total}} 筆結果",
      previous: "上一頁",
      next: "下一頁",
    },
    languageSwitcher: {
      english: "English",
      simplified: "简体中文",
      traditional: "繁體中文",
    },
    loader: {
      alt: "載入中...",
    },
    messageAvatar: {
      assistantAlt: "Bytebot",
    },
    screenshot: {
      noScreenshots: "暫無截圖",
    },
    chat: {
      bytebotWorking: "Bytebot 正在處理...",
    },
    computerTool: {
      labels: {
        screenshot: "截圖",
        wait: "等待",
        keys: "按鍵",
        type: "輸入",
        paste: "貼上",
        pressKeys: "組合鍵",
        moveMouse: "移動滑鼠",
        scroll: "捲動",
        cursorPosition: "游標位置",
        click: "點擊",
        doubleClick: "雙擊",
        tripleClick: "三擊",
        buttonClick: "{{button}} 點擊",
        drag: "拖曳",
        pressMouse: "按下滑鼠",
        traceMouse: "軌跡",
        openApplication: "開啟應用程式",
        readFile: "讀取檔案",
        unknown: "未知",
      },
      buttons: {
        left: "左鍵",
        right: "右鍵",
        middle: "中鍵",
      },
      details: {
        from: "起點",
        to: "終點",
        scroll: "{{direction}}{{count}} 次",
      },
      directions: {
        up: "向上",
        down: "向下",
        left: "向左",
        right: "向右",
        none: "無",
      },
      applications: {
        firefox: "Firefox",
        "1password": "1Password",
        thunderbird: "Thunderbird",
        vscode: "Visual Studio Code",
        terminal: "終端機",
        directory: "檔案管理員",
        desktop: "桌面",
      },
    },
  },
};
