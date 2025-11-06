// フォーム要素の取得
const departmentInput = document.getElementById("department");
const nameJaInput = document.getElementById("nameJa");
const nameEnInput = document.getElementById("nameEn");
const titleInput = document.getElementById("title");

// Canvas要素の取得
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");

// 画像のプリロード
const images = {
  templateA_bg: new Image(),
  templateB_bg: new Image(),
  templateC_bg: new Image(),
  previewPersonA: new Image(),
  previewPersonB: new Image(),
  previewPersonC: new Image(),
};

let imagesLoaded = 0;
const totalImages = 6;

// 初期値を入力欄へ反映（空欄のみ）。英語名は大文字化
function applyDefaultValuesIfEmpty() {
  if (!departmentInput.value && departmentInput.placeholder) {
    departmentInput.value = departmentInput.placeholder;
  }
  if (!nameJaInput.value && nameJaInput.placeholder) {
    nameJaInput.value = nameJaInput.placeholder;
  }
  if (!nameEnInput.value && nameEnInput.placeholder) {
    nameEnInput.value = nameEnInput.placeholder.toUpperCase();
  }
  if (!titleInput.value && titleInput.placeholder) {
    titleInput.value = titleInput.placeholder;
  }
}

// 画像読み込み完了時の処理
function onImageLoad() {
  imagesLoaded++;
  console.log(`画像読み込み完了: ${imagesLoaded}/${totalImages}`);
  if (imagesLoaded === totalImages) {
    console.log("すべての画像読み込み完了、プレビュー更新開始");
    applyDefaultValuesIfEmpty();
    updateAllPreviews();
  }
}

// 画像読み込みエラー時の処理
function onImageError(imageName) {
  return function () {
    console.error(`画像読み込みエラー: ${imageName}`);
    alert(`画像の読み込みに失敗しました: ${imageName}`);
  };
}

// 画像の読み込み
images.templateA_bg.onload = onImageLoad;
images.templateA_bg.onerror = onImageError("templateA_bg.png");
images.templateA_bg.src = "img/templateA_bg.png";

images.templateB_bg.onload = onImageLoad;
images.templateB_bg.onerror = onImageError("templateB_bg.png");
images.templateB_bg.src = "img/templateB_bg.png";

images.templateC_bg.onload = onImageLoad;
images.templateC_bg.onerror = onImageError("templateC_bg.png");
images.templateC_bg.src = "img/templateC_bg.png";

images.previewPersonA.onload = onImageLoad;
images.previewPersonA.onerror = onImageError("Image1 Container.svg");
images.previewPersonA.src =
  "img/Image1 Container_ダウンロードする中には含めないでください.svg";

images.previewPersonB.onload = onImageLoad;
images.previewPersonB.onerror = onImageError("Image2 Container.svg");
images.previewPersonB.src =
  "img/Image2 Container_ダウンロードする中には含めないでください.svg";

images.previewPersonC.onload = onImageLoad;
images.previewPersonC.onerror = onImageError("Image3 Container.svg");
images.previewPersonC.src =
  "img/Image3 Container_ダウンロードする中には含めないでください.svg";

// 英語名は入力中に常に大文字へ正規化（カーソル位置を維持）
nameEnInput.addEventListener("input", () => {
  const start = nameEnInput.selectionStart;
  const end = nameEnInput.selectionEnd;
  const upper = (nameEnInput.value || "").toUpperCase();
  if (upper !== nameEnInput.value) {
    nameEnInput.value = upper;
    try {
      nameEnInput.setSelectionRange(start, end);
    } catch (_) {
      // 一部ブラウザ/IME状況でsetSelectionRange不可の場合は無視
    }
  }
});

// 入力値の変更を監視して即座にプレビューを更新
[departmentInput, nameJaInput, nameEnInput, titleInput].forEach((input) => {
  input.addEventListener("input", updateAllPreviews);
});

// 初期プレビューの生成
window.addEventListener("load", () => {
  applyDefaultValuesIfEmpty();
  if (imagesLoaded === totalImages) {
    updateAllPreviews();
  }
});

// すべてのプレビューを更新
function updateAllPreviews() {
  const trim = (el) => (el.value || "").trim();
  const userData = {
    department: trim(departmentInput),
    nameJa: trim(nameJaInput),
    nameEn: trim(nameEnInput),
    title: trim(titleInput),
  };

  generateTemplate1(canvas1, userData, true);
  generateTemplate2(canvas2, userData, true);
  generateTemplate3(canvas3, userData, true);
}

// テンプレートA: シンプル（左上にテキスト、右下にロゴ）
function generateTemplate1(canvas, userData, isPreview = false) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // 背景画像を描画
  ctx.drawImage(images.templateA_bg, 0, 0, width, height);

  // 左上にテキスト情報
  const leftMargin = 80;
  const topStart = 160; // 基準ライン（中央揃え用）
  ctx.textBaseline = "middle";

  // 氏名（日本語）と（英語）を横並び、上下中央揃え
  let drewNameRow = false;
  let currentX = leftMargin;
  if (userData.nameJa) {
    ctx.fillStyle = "#222222";
    ctx.font = '700 60px "LINE Seed JP", sans-serif';
    const jaText = userData.nameJa;
    const jaWidth = ctx.measureText(jaText).width;
    ctx.fillText(jaText, currentX, topStart);
    currentX += jaWidth;
    drewNameRow = true;
  }

  // 名称間の間隔（Figmaバランスに寄せた見栄え）
  const nameGap = 40;
  if (userData.nameJa && userData.nameEn) {
    currentX += nameGap;
  }

  if (userData.nameEn) {
    ctx.fillStyle = "#222222";
    ctx.font = '400 42px "LINE Seed JP", sans-serif';
    const enText = userData.nameEn.toUpperCase();
    // 日本語名がなければ左から描画
    if (!userData.nameJa) currentX = leftMargin;
    ctx.fillText(enText, currentX, topStart);
    drewNameRow = true;
  }

  // 部署名と肩書きを1行に
  let infoLine = "";
  if (userData.department) {
    infoLine += userData.department;
  }
  if (userData.title) {
    if (infoLine) infoLine += " ";
    infoLine += userData.title;
  }
  if (infoLine) {
    ctx.fillStyle = "#222222";
    ctx.font = '400 34px "LINE Seed JP", sans-serif';
    // 氏名行の下に十分な余白を空けて配置
    ctx.textBaseline = "alphabetic";
    const infoY = drewNameRow ? topStart + 110 : topStart;
    ctx.fillText(infoLine, leftMargin, infoY);
  }

  // プレビュー時のみ人物イラストを中央下部に配置
  if (isPreview && images.previewPersonA.complete) {
    // 大きめに（最大100%）かつアスペクト比維持、中央下部固定
    const imgW = images.previewPersonA.width;
    const imgH = images.previewPersonA.height;
    const maxW = width * 1.0;
    const maxH = height * 1.0;
    const scale = Math.min(maxW / imgW, maxH / imgH);
    const personWidth = imgW * scale;
    const personHeight = imgH * scale;
    const personX = (width - personWidth) / 2;
    const personY = height - personHeight;
    ctx.drawImage(
      images.previewPersonA,
      personX,
      personY,
      personWidth,
      personHeight
    );
  }
}

// テンプレートB: ビジネススタイル（左上にロゴ、右下にページめくり）
function generateTemplate2(canvas, userData, isPreview = false) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // 背景画像を描画
  ctx.drawImage(images.templateB_bg, 0, 0, width, height);

  // テキスト情報は表示しない（テンプレートBはロゴのみ）

  // プレビュー時のみ人物イラストを中央下部に配置
  if (isPreview && images.previewPersonB.complete) {
    const imgW = images.previewPersonB.width;
    const imgH = images.previewPersonB.height;
    const maxW = width * 0.9;
    const maxH = height * 0.9;
    const scale = Math.min(maxW / imgW, maxH / imgH);
    const personWidth = imgW * scale;
    const personHeight = imgH * scale;
    const personX = (width - personWidth) / 2;
    const personY = height - personHeight;
    ctx.drawImage(
      images.previewPersonB,
      personX,
      personY,
      personWidth,
      personHeight
    );
  }
}

// テンプレートC: キャッチコピー付き（左上にロゴ、右上に縦書き、左下にテキスト）
function generateTemplate3(canvas, userData, isPreview = false) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // 背景画像を描画
  ctx.drawImage(images.templateC_bg, 0, 0, width, height);

  // 左下テキスト（1920x1080基準のスペーシングで"下寄せ"配置）
  const leftMargin = 80;
  const bottomMargin = 100;
  const heights = { ja: 80, en: 52, dept: 52, title: 52 };
  const gaps = { ja_en: 10, en_dept: 30, dept_title: 10 };

  const lines = [];
  if (userData.nameJa) lines.push("ja");
  if (userData.nameEn) lines.push("en");
  if (userData.department) lines.push("dept");
  if (userData.title) lines.push("title");

  // 総ブロック高を計算して下寄せ開始位置を決定
  let totalHeight = 0;
  for (let i = 0; i < lines.length; i++) {
    totalHeight += heights[lines[i]];
    const next = lines[i + 1];
    if (!next) continue;
    if (lines[i] === "ja" && next === "en") totalHeight += gaps.ja_en;
    else if ((lines[i] === "ja" || lines[i] === "en") && next === "dept")
      totalHeight += gaps.en_dept;
    else if (lines[i] === "dept" && next === "title")
      totalHeight += gaps.dept_title;
  }
  let y = height - bottomMargin - totalHeight;
  for (let i = 0; i < lines.length; i++) {
    const part = lines[i];
    // 進めてから描画（各行の高さ分）
    y += heights[part];

    if (part === "ja") {
      ctx.fillStyle = "#222222";
      ctx.font = '700 60px "LINE Seed JP", sans-serif';
      ctx.fillText(userData.nameJa, leftMargin, y);
    } else if (part === "en") {
      ctx.fillStyle = "#222222";
      ctx.font = '400 34px "LINE Seed JP", sans-serif';
      ctx.fillText(userData.nameEn.toUpperCase(), leftMargin, y);
    } else if (part === "dept") {
      ctx.fillStyle = "#222222";
      ctx.font = '400 28px "LINE Seed JP", sans-serif';
      ctx.fillText(userData.department, leftMargin, y);
    } else if (part === "title") {
      ctx.fillStyle = "#222222";
      ctx.font = '400 28px "LINE Seed JP", sans-serif';
      ctx.fillText(userData.title, leftMargin, y);
    }

    // 次の行までのギャップ
    const next = lines[i + 1];
    if (!next) break;
    if (part === "ja" && next === "en") y += gaps.ja_en;
    else if ((part === "ja" || part === "en") && next === "dept")
      y += gaps.en_dept; // 添付準拠: 30px
    else if (part === "dept" && next === "title") y += gaps.dept_title;
  }

  // プレビュー時のみ人物イラストを中央下部に配置
  if (isPreview && images.previewPersonC.complete) {
    const imgW = images.previewPersonC.width;
    const imgH = images.previewPersonC.height;
    const maxW = width * 0.9;
    const maxH = height * 0.9;
    const scale = Math.min(maxW / imgW, maxH / imgH);
    const personWidth = imgW * scale;
    const personHeight = imgH * scale;
    const personX = (width - personWidth) / 2;
    const personY = height - personHeight;
    ctx.drawImage(
      images.previewPersonC,
      personX,
      personY,
      personWidth,
      personHeight
    );
  }
}

// 画像をダウンロード（プレビュー用の人物イラストなしで再生成）
function downloadImage(canvasId, filename) {
  // 画像が読み込まれていない場合は警告
  if (imagesLoaded < totalImages) {
    alert("画像を読み込み中です。もう一度お試しください。");
    return;
  }

  console.log("ダウンロード開始:", canvasId, filename);
  console.log("画像読み込み状態:", imagesLoaded, "/", totalImages);
  console.log("背景画像の状態:", {
    templateA: images.templateA_bg.complete,
    templateB: images.templateB_bg.complete,
    templateC: images.templateC_bg.complete,
  });

  const canvas = document.getElementById(canvasId);
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  console.log("Canvas サイズ:", tempCanvas.width, "x", tempCanvas.height);

  const userData = {
    department: departmentInput.value || departmentInput.placeholder,
    nameJa: nameJaInput.value || nameJaInput.placeholder,
    nameEn: nameEnInput.value || nameEnInput.placeholder,
    title: titleInput.value || titleInput.placeholder,
  };

  // プレビューなしで再生成（isPreview = false）
  try {
    if (canvasId === "canvas1") {
      console.log("テンプレートA生成開始");
      generateTemplate1(tempCanvas, userData, false);
    } else if (canvasId === "canvas2") {
      console.log("テンプレートB生成開始");
      generateTemplate2(tempCanvas, userData, false);
    } else if (canvasId === "canvas3") {
      console.log("テンプレートC生成開始");
      generateTemplate3(tempCanvas, userData, false);
    }

    console.log("Canvas描画完了、ダウンロード準備中");

    // ダウンロード（ファイル名: zoom-background-{英語名}.png）
    const link = document.createElement("a");
    const englishNameForFile = (userData.nameEn || "").trim().toUpperCase();
    link.download = `zoom-background-${englishNameForFile}.png`;
    link.href = tempCanvas.toDataURL("image/png");
    link.click();

    console.log("ダウンロード成功");
  } catch (error) {
    console.error("ダウンロードエラー詳細:", error);
    console.error("エラースタック:", error.stack);
    alert("画像のダウンロードに失敗しました。コンソールを確認してください。");
  }
}
