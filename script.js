const generateBtn = document.getElementById("generate");
const promptInput = document.getElementById("prompt");
const output = document.getElementById("output");

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return alert("اكتب وصف الصورة!");

  output.innerHTML = "⏳ جاري التوليد...";

  try {
    const resp = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await resp.json();

    if (resp.ok && data.imageUrl) {
      output.innerHTML = `<img src="${data.imageUrl}" alt="AI Image" />`;
    } else {
      output.innerHTML = `❌ حدث خطأ: ${data.error || JSON.stringify(data)}`;
      console.error(data);
    }
  } catch (err) {
    output.innerHTML = `❌ خطأ أثناء الاتصال: ${err.message}`;
    console.error(err);
  }
});
