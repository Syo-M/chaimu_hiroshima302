////////////////////////// 時計。一桁の場合はpadStart()で０を足して強制的に２桁にする機能付き
function clock() {
    const clock = document.getElementById("clock");
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}
setInterval(clock, 1000);

///////////////////////// 学校用チャイム
// ブラウザがJSで自動的に音を鳴らす処理をブロックするため、
// チャイム開始ボタンを設定して、ユーザーがボタンを押すことでクリックイベントが発生。
// こうすることでユーザーが自分の意思で音を鳴らすことに同意したと判断され、チャイムが鳴ります。

const c_btn = document.getElementById("chime_button"); /* チャイム用ボタン */

c_btn.addEventListener("click", function () {
    let alarms = []; // アラームのリスト
    let isClickEnabled = true; // クリックイベントの有効/無効フラグ
    const messageDisplay = document.querySelector(".timeMassage"); // セクション内のh2要素を取得

    // 連続クリックによるエラー防止
    if (!isClickEnabled) {
        // クリックイベントが無効の場合、処理しない
        return;
    }
    // クリック後、一定の時間（2秒）クリックを無効化する
    isClickEnabled = false;
    setTimeout(() => {
        isClickEnabled = true;
    }, 2000);

    // 既存のアラームをキャンセル
    alarms.forEach((alarm) => {
        clearTimeout(alarm);
    });
    // クリアしたのでアラームリストを初期化
    alarms = [];

    const chime = new Audio("https://github.com/Syo-M/studio02base/raw/main/bgm/school_Bell.mp3");
    const closed = new Audio("https://github.com/Syo-M/studio02base/raw/main/bgm/hotaru_piano_10.mp3");
    // 音源元サイト https://mmt38.info/arrange/hotaru/

    // アラーム処理
    function setAlarm(hour, minute, message, sound) {
        const now = new Date();
        const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);

        if (alarmTime > now) {
            const delay = alarmTime - now;
            const alarm = setTimeout(() => {
                sound.currentTime = 0;
                sound.play();
                // console.logの代わりにh2のテキストを変更
                if (messageDisplay) {
                    messageDisplay.textContent = message;
                }
            }, delay);

            alarms.push(alarm); // 新しいアラームをリストに追加
        }
    }

    // アラームの時間設定
    // 改造前の値　9 10
    const alarmHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; /* 設定したい時間（時間） */
    const alarmMinutes = [10, 20, 30, 5]; /* 設定したい時間（分） */

    setAlarm(
        alarmHours[0],
        // 改造前 2
        alarmMinutes[2],
        alarmHours[0] + "時" + alarmMinutes[2] + "分" + "です。" + "1限目だよ。",
        chime
    );
    setAlarm(
        alarmHours[1],
        alarmMinutes[1],
        alarmHours[1] + "時" + alarmMinutes[1] + "分" + "です。" + "1限目終了。休憩時間です。",
        chime
    );
    setAlarm(
        alarmHours[1],
        alarmMinutes[2],
        alarmHours[1] + "時" + alarmMinutes[2] + "分" + "です。" + "2限目だよ。",
        chime
    );
    setAlarm(
        alarmHours[2],
        alarmMinutes[1],
        alarmHours[2] + "時" + alarmMinutes[1] + "分" + "です。" + "2限目終了。休憩時間です",
        chime
    );
    setAlarm(
        alarmHours[2],
        alarmMinutes[2],
        alarmHours[2] + "時" + alarmMinutes[2] + "分" + "です。" + "3限目だよ。",
        chime
    );
    setAlarm(
        alarmHours[3],
        alarmMinutes[1],
        alarmHours[3] + "時" + alarmMinutes[1] + "分" + "です。" + "3限目終了。お昼休みです",
        chime
    );
    setAlarm(
        alarmHours[4],
        alarmMinutes[1],
        alarmHours[4] + "時" + alarmMinutes[1] + "分" + "です。" + "4限目だよ。",
        chime
    );
    setAlarm(
        alarmHours[5],
        alarmMinutes[0],
        alarmHours[5] + "時" + alarmMinutes[0] + "分" + "です。" + "4限目終了。休憩時間です。",
        chime
    );
    setAlarm(
        alarmHours[5],
        alarmMinutes[1],
        alarmHours[5] + "時" + alarmMinutes[1] + "分" + "です。" + "5限目だよ。",
        chime
    );
    setAlarm(
        alarmHours[6],
        alarmMinutes[0],
        alarmHours[6] + "時" + alarmMinutes[0] + "分" + "です。" + "5限目終了。休憩時間です",
        chime
    );
    setAlarm(
        alarmHours[6],
        alarmMinutes[1],
        alarmHours[6] + "時" + alarmMinutes[1] + "分" + "です。" + "6限目だよ。",
        chime
    );
    setAlarm(
        alarmHours[7],
        alarmMinutes[0],
        alarmHours[7] +
            "時" +
            alarmMinutes[0] +
            "分" +
            "です。" +
            "6限目終了。本日の授業終了です。放課後は1時間自習ができます。",
        chime
    );
    setAlarm(alarmHours[8], alarmMinutes[3], "まもなく自習タイム終了。また次の授業でお会いしましょう。", closed);

    // ボタンクリック時に初期メッセージを表示
    if (messageDisplay) {
        messageDisplay.textContent = "チャイムシステム起動。画面を開いたままにしてください";
    }
});
