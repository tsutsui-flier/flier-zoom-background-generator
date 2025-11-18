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
  previewPersonA: new Image(),
  previewPersonB: new Image(),
  previewPersonC: new Image(),
};

let imagesLoaded = 0;
const totalImages = 12;

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

  generateTemplate(canvas1, userData, images.template_1, true);
  generateTemplate(canvas2, userData, images.template_2, true);
  generateTemplate(canvas3, userData, images.template_3, true);
  generateTemplate(canvas4, userData, images.template_4, true);
  generateTemplate(canvas5, userData, images.template_5, true);
  generateTemplate(canvas6, userData, images.template_6, true);
  generateTemplate(canvas7, userData, images.template_7, true);
  generateTemplate(canvas8, userData, images.template_8, true);
  generateTemplate(canvas9, userData, images.template_9, true);
}

// 汎用テンプレート生成関数（背景画像のみを描画）
function generateTemplate(canvas, userData, templateImage, isPreview = false) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // 背景画像を描画
  if (templateImage && templateImage.complete) {
    ctx.drawImage(templateImage, 0, 0, width, height);
  }

  // プレビュー時のみ人物イラストを中央下部に配置
  if (isPreview && images.previewPersonA.complete) {
    const imgW = images.previewPersonA.width;
    const imgH = images.previewPersonA.height;
    const maxW = width * 0.9;
    const maxH = height * 0.9;
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

  console.log("Canvas サイズ:", tempCanvas.width, "x", tempCanvas.height);

  const userData = {
    department: departmentInput.value || departmentInput.placeholder,
    nameJa: nameJaInput.value || nameJaInput.placeholder,
    nameEn: nameEnInput.value || nameEnInput.placeholder,
    title: titleInput.value || titleInput.placeholder,
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

  // プレビューなしで再生成（isPreview = false）
  try {
    const templateImage = templateMap[canvasId];
    if (templateImage) {
      console.log(`テンプレート${canvasId}生成開始`);
      generateTemplate(tempCanvas, userData, templateImage, false);
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
