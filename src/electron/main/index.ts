import { app, BrowserWindow } from "electron";
import path from "path";
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        show: false,
        webPreferences: {
            // contextIsolation: false, // 是否开启隔离上下文
            // nodeIntegration: true, // 渲染进程使用Node API
            preload: path.join(__dirname, "../preload/index.ts"),
        },
    });
    // 发布时需换成生产域名
    win.loadURL(`http://localhost:5173/`);
    // 等页面加载完打开
    win.once("ready-to-show", () => {
        win.show();
    });
};
app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
