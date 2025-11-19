// フォーム要素の取得
const departmentInput = document.getElementById("department");
const nameJaInput = document.getElementById("nameJa");
const nameEnInput = document.getElementById("nameEn");
const titleInput = document.getElementById("title");

// Canvas要素の取得
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");
const canvas4 = document.getElementById("canvas4");
const canvas5 = document.getElementById("canvas5");
const canvas6 = document.getElementById("canvas6");
const canvas7 = document.getElementById("canvas7");
const canvas8 = document.getElementById("canvas8");
const canvas9 = document.getElementById("canvas9");

// 画像のプリロード
const images = {
  template_1: new Image(),
  template_2: new Image(),
  template_3: new Image(),
  template_4: new Image(),
  template_5: new Image(),
  template_6: new Image(),
  template_7: new Image(),
  template_8: new Image(),
  template_9: new Image(),
  previewPerson1: new Image(),
  previewPerson2: new Image(),
  previewPerson3: new Image(),
  previewPerson4: new Image(),
  previewPerson5: new Image(),
  previewPerson6: new Image(),
  previewPerson7: new Image(),
  previewPerson8: new Image(),
  previewPerson9: new Image(),
};

let imagesLoaded = 0;
const totalImages = 18;

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
images.template_1.onload = onImageLoad;
images.template_1.onerror = onImageError("template_1.png");
images.template_1.src = "img/template_1.png";

images.template_2.onload = onImageLoad;
images.template_2.onerror = onImageError("template_2.png");
images.template_2.src = "img/template_2.png";

images.template_3.onload = onImageLoad;
images.template_3.onerror = onImageError("template_3.png");
images.template_3.src = "img/template_3.png";

images.template_4.onload = onImageLoad;
images.template_4.onerror = onImageError("template_4.png");
images.template_4.src = "img/template_4.png";

images.template_5.onload = onImageLoad;
images.template_5.onerror = onImageError("template_5.png");
images.template_5.src = "img/template_5.png";

images.template_6.onload = onImageLoad;
images.template_6.onerror = onImageError("template_6.png");
images.template_6.src = "img/template_6.png";

images.template_7.onload = onImageLoad;
images.template_7.onerror = onImageError("template_7.png");
images.template_7.src = "img/template_7.png";

images.template_8.onload = onImageLoad;
images.template_8.onerror = onImageError("template_8.png");
images.template_8.src = "img/template_8.png";

images.template_9.onload = onImageLoad;
images.template_9.onerror = onImageError("template_9.png");
images.template_9.src = "img/template_9.png";

images.previewPerson1.onload = onImageLoad;
images.previewPerson1.onerror = onImageError("Image1 Container.svg");
images.previewPerson1.src =
  "img/Image1 Container_ダウンロードする中には含めないでください.svg";

images.previewPerson2.onload = onImageLoad;
images.previewPerson2.onerror = onImageError("Image2 Container.svg");
images.previewPerson2.src =
  "img/Image2 Container_ダウンロードする中には含めないでください.svg";

images.previewPerson3.onload = onImageLoad;
images.previewPerson3.onerror = onImageError("Image3 Container.svg");
images.previewPerson3.src =
  "img/Image3 Container_ダウンロードする中には含めないでください.svg";

images.previewPerson4.onload = onImageLoad;
images.previewPerson4.onerror = onImageError("Image4 Container.svg");
images.previewPerson4.src =
  "img/Image4 Container_ダウンロードする中には含めないでください.svg";

images.previewPerson5.onload = onImageLoad;
images.previewPerson5.onerror = onImageError("Image5 Container.svg");
images.previewPerson5.src =
  "img/Image5 Container_ダウンロードする中には含めないでください.svg";

images.previewPerson6.onload = onImageLoad;
images.previewPerson6.onerror = onImageError("Image6 Container.svg");
images.previewPerson6.src =
  "img/Image6 Container_ダウンロードする中には含めないでください.svg";

images.previewPerson7.onload = onImageLoad;
images.previewPerson7.onerror = onImageError("Image7 Container.svg");
images.previewPerson7.src =
  "img/Image7 Container_ダウンロードする中には含めないでください.svg";

images.previewPerson8.onload = onImageLoad;
images.previewPerson8.onerror = onImageError("Image8 Container.svg");
images.previewPerson8.src =
  "img/Image8 Container_ダウンロードする中には含めないでください.svg";

images.previewPerson9.onload = onImageLoad;
images.previewPerson9.onerror = onImageError("Image9 Container.svg");
images.previewPerson9.src =
  "img/Image9 Container_ダウンロードする中には含めないでください.svg";

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

  generateTemplate(canvas1, userData, images.template_1, images.previewPerson1, true);
  generateTemplate(canvas2, userData, images.template_2, images.previewPerson2, true);
  generateTemplate(canvas3, userData, images.template_3, images.previewPerson3, true);
  generateTemplate(canvas4, userData, images.template_4, images.previewPerson4, true);
  generateTemplate(canvas5, userData, images.template_5, images.previewPerson5, true);
  generateTemplate(canvas6, userData, images.template_6, images.previewPerson6, true);
  generateTemplate(canvas7, userData, images.template_7, images.previewPerson7, true);
  generateTemplate(canvas8, userData, images.template_8, images.previewPerson8, true);
  generateTemplate(canvas9, userData, images.template_9, images.previewPerson9, true);
}

// 汎用テンプレート生成関数（背景画像 + テキスト + プレビュー用人物イラスト）
function generateTemplate(canvas, userData, templateImage, previewPersonImage, isPreview = false) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // 背景画像を描画
  if (templateImage && templateImage.complete) {
    ctx.drawImage(templateImage, 0, 0, width, height);
  }

  // canvas4は右寄せ、canvas9は白文字
  const isRightAlign = (canvas.id === "canvas4");
  const isWhiteText = (canvas.id === "canvas9");

  // 左下にテキスト情報を描画（1920x1080基準のスペーシングで"下寄せ"配置）
  const leftMargin = 80;
  const rightMargin = 80; // 右寄せ時の右端からの距離
  const bottomMargin = 135; // 下辺から135px
  const heights = { ja: 80, en: 32, dept: 32, title: 32 };
  const gaps = { ja_en: 25, en_dept: 40, dept_title: 20 }; // 所属と肩書きの上に10pxずつ追加

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
  ctx.textBaseline = "alphabetic";

  // テキスト色の設定
  const textColor = isWhiteText ? "#ffffff" : "#222222";

  // 右寄せの場合、最長テキスト幅を計算してベースX座標を決定
  let baseX = leftMargin;
  if (isRightAlign) {
    let maxWidth = 0;
    for (const part of lines) {
      if (part === "ja") {
        ctx.font = '600 64px "Noto Sans", "Noto Sans JP", sans-serif';
        maxWidth = Math.max(maxWidth, ctx.measureText(userData.nameJa).width);
      } else if (part === "en") {
        ctx.font = '600 32px "Noto Sans", "Noto Sans JP", sans-serif';
        maxWidth = Math.max(maxWidth, ctx.measureText(userData.nameEn.toUpperCase()).width);
      } else if (part === "dept") {
        ctx.font = '600 32px "Noto Sans", "Noto Sans JP", sans-serif';
        maxWidth = Math.max(maxWidth, ctx.measureText(userData.department).width);
      } else if (part === "title") {
        ctx.font = '600 32px "Noto Sans", "Noto Sans JP", sans-serif';
        maxWidth = Math.max(maxWidth, ctx.measureText(userData.title).width);
      }
    }
    baseX = width - rightMargin - maxWidth;
  }

  for (let i = 0; i < lines.length; i++) {
    const part = lines[i];
    // 進めてから描画（各行の高さ分）
    y += heights[part];

    if (part === "ja") {
      ctx.fillStyle = textColor;
      ctx.font = '600 64px "Noto Sans", "Noto Sans JP", sans-serif';
      ctx.fillText(userData.nameJa, baseX, y);
    } else if (part === "en") {
      ctx.fillStyle = textColor;
      ctx.font = '600 32px "Noto Sans", "Noto Sans JP", sans-serif';
      ctx.fillText(userData.nameEn.toUpperCase(), baseX, y);
    } else if (part === "dept") {
      ctx.fillStyle = textColor;
      ctx.font = '600 32px "Noto Sans", "Noto Sans JP", sans-serif';
      ctx.fillText(userData.department, baseX, y);
    } else if (part === "title") {
      ctx.fillStyle = textColor;
      ctx.font = '600 32px "Noto Sans", "Noto Sans JP", sans-serif';
      ctx.fillText(userData.title, baseX, y);
    }

    // 次の行までのギャップ
    const next = lines[i + 1];
    if (!next) break;
    if (part === "ja" && next === "en") y += gaps.ja_en;
    else if ((part === "ja" || part === "en") && next === "dept")
      y += gaps.en_dept;
    else if (part === "dept" && next === "title") y += gaps.dept_title;
  }

  // プレビュー時のみ対応する人物イラストを中央下部に配置
  if (isPreview && previewPersonImage && previewPersonImage.complete) {
    const imgW = previewPersonImage.width;
    const imgH = previewPersonImage.height;
    const maxW = width * 0.9;
    const maxH = height * 0.9;
    const scale = Math.min(maxW / imgW, maxH / imgH);
    const personWidth = imgW * scale;
    const personHeight = imgH * scale;
    const personX = (width - personWidth) / 2;
    const personY = height - personHeight;
    ctx.drawImage(
      previewPersonImage,
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

  const canvas = document.getElementById(canvasId);
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCanvas.id = canvasId; // canvas IDを設定して、generateTemplate内で正しく判定できるようにする

  console.log("Canvas サイズ:", tempCanvas.width, "x", tempCanvas.height);

  // プレビューと同じく、trim()で空欄チェック（プレースホルダーは使用しない）
  const trim = (el) => (el.value || "").trim();
  const userData = {
    department: trim(departmentInput),
    nameJa: trim(nameJaInput),
    nameEn: trim(nameEnInput),
    title: trim(titleInput),
  };

  // テンプレート画像のマッピング
  const templateMap = {
    canvas1: images.template_1,
    canvas2: images.template_2,
    canvas3: images.template_3,
    canvas4: images.template_4,
    canvas5: images.template_5,
    canvas6: images.template_6,
    canvas7: images.template_7,
    canvas8: images.template_8,
    canvas9: images.template_9,
  };

  // プレビューなしで再生成（isPreview = false、人物イラストなし）
  try {
    const templateImage = templateMap[canvasId];
    if (templateImage) {
      console.log(`テンプレート${canvasId}生成開始`);
      generateTemplate(tempCanvas, userData, templateImage, null, false);
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
