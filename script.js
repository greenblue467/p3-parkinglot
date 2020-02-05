window.onload = function() {
  const select = document.getElementById("select");
  const map = document.getElementById("map");
  const spot = document.getElementById("spot");
  const xhr = new XMLHttpRequest();
  const makeARequest = function(e) {
    const key = e.target.value;
    xhr.open(
      "GET",
      "https://api.kcg.gov.tw/api/service/get/897e552a-2887-4f6f-a6ee-709f7fbe0ee3"
    );
    xhr.onload = function() {
      const res = this.responseText;
      const content1 = JSON.parse(res);
      const content2 = content1.data;
      const content3 = content2
        .map(x => {
          if (x.行政區 == key) {
            return `<ul class="style" onclick="op('${x.臨時停車處所}')">
              <span id="shield" >查看位置</span><li><span>行政區：</span>${x.行政區}</li>
              <li><span>停車處：</span>${x.臨時停車處所}</li>
              <li><span>停車格數量：</span>${x.可提供小型車停車位}</li>
              <li><span>地點：</span>${x.地址}</li>
            </ul>`;
          }
        })
        .join("");
      spot.innerHTML = content3;
      map.innerHTML = "";
    };
    xhr.send();
  };
  select.addEventListener("change", makeARequest);
};
