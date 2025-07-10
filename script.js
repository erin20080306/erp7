const scriptURLs = {
  "TAO1": "https://script.google.com/macros/s/AKfycbyMdIIg_BjzqOWvn4Mzfgo7hCOx8nYNry1Xg-EFpEo9Gg8ECD8x0NRPwFvQZj4agM6u/exec",
  "TAO3": "https://script.google.com/macros/s/AKfycbyCXqK6d8tu91LCfiK5Iwn175GwC0b8xS3to20v3lOvs41r9isiUCnr87KOKBcFI0Q/exec",
  "TAO4": "https://script.google.com/macros/s/AKfycbxOcL5pq_bO8mUn4ANSD2CupGQyz-0aqqHJepyui_0TjWQ7ije8dn9FB6FIxObu-Ro/exec",
  "TAO5": "https://script.google.com/macros/s/AKfycbx3PC0hwH4_OdUxC8zMgut_ZxA8KtERvu8IkH-xQLCK5-khbn7MMu6w3xLLmZxjuvOs/exec",
  "TAO6": "https://script.google.com/macros/s/AKfycbxGoISWpRxJ3Da2wYSFkPuM_PjHyidl1l-Pe2xWR0xDO1oku6M63wvRwOL4FsOOUgs/exec",
  "TAO7": "https://script.google.com/macros/s/AKfycbzGwJMTeYTBq_9ZgH_oGroVC_isk-qnCxFRE0DxmwzTabZXoezw4Gexa9WGp-94V1I/exec"
};

document.getElementById("warehouse").addEventListener("change", function () {
  const warehouse = this.value;
  const sheetSelect = document.getElementById("sheet");
  sheetSelect.innerHTML = '<option value="">載入中...</option>';

  const url = scriptURLs[warehouse];
  if (!url) {
    sheetSelect.innerHTML = '<option value="">無效倉別</option>';
    return;
  }

  fetch(`${url}?mode=getSheets`)
    .then(res => {
      if (!res.ok) throw new Error("網路錯誤");
      return res.json();
    })
    .then(names => {
      sheetSelect.innerHTML = '<option value="">請選擇資料表</option>';
      names.forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.text = name;
        sheetSelect.appendChild(opt);
      });
    })
    .catch((err) => {
      console.error("錯誤：", err);
      sheetSelect.innerHTML = '<option value="">載入失敗</option>';
    });
});

document.getElementById("queryBtn").addEventListener("click", function () {
  const warehouse = document.getElementById("warehouse").value;
  const sheet = document.getElementById("sheet").value;
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim(); // 選填

  if (!warehouse || !sheet || !name) {
    alert("請選擇倉別與資料表並輸入姓名！");
    return;
  }

  let url = `${scriptURLs[warehouse]}?sheet=${encodeURIComponent(sheet)}&name=${encodeURIComponent(name)}&from=glitch`;

  if (phone) {
    url += `&phone=${encodeURIComponent(phone)}`;
  }

  window.open(url, "_blank");
});

