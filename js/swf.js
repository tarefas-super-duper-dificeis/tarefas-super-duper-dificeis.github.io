var SWFS = [
["Bloxors","bloxors/bloxors.swf"],
["Bloons TD 1","BTD-1/bloons_tower_defense_1.swf"],
["Bloons TD 2","BTD-2/btd2.swf"],
["Bloons TD 3","BTD-3/BTD-3.swf"],
["Bloons TD 4","BTD-4/BTD-4.swf"],
["Bloons TD 5","BTD-5/BTD-5.swf"],
["Deal or No Deal","deal-or-no-deal/dealornodeal.swf"],
["Duck Life 1","duck-life-1/ducklife1.swf"],
["Duck Life 2","duck-life-2/ducklife2.swf"],
["Duck Life 3","duck-life-3/ducklife3.swf"],
["Duck Life 4","duck-life-4/ducklife4.swf"],
["Helicopter","helicopter/helicopter.swf"],
["Idle Web Tycoon","idle-web-tycoon/idlewebtycoon.swf"],
["Impossible Quiz","impossiblequiz/impossiblequiz.swf"],
["Impossible Quiz 2","impossiblequiz-2/impossiblequiz2.swf"],
["Jacksmith","jacksmith/jacksmith.swf"],
["Learn to Fly","learn-to-fly/learntofly.swf"],
["Learn to Fly 2","learn-to-fly-2/learn-to-fly-2.swf"],
["Learn to Fly 3","learn-to-fly-3/learn-to-fly-3.swf"],
["Learn to Fly Idle","learn-to-fly-idle/learntoflyidle.swf"],
["Pandemic 2","pandemic-2/pandemic2.swf"],
["Papa Louie","papa-louie/papalouie_v2.swf"],
["Papa's Bakeria","papas-bakeria/QQGwbd1B4AuJ69.swf"],
["Papa's Burgeria","papas-burgeria/YHiaMNblkItEvi.swf"],
["Papa's Cheeseria","papas-cheeseria/58GqwwuGG1j0oB.swf"],
["Papa's Cupcakeria","papas-cupcakeria/8Yw2cUe3RMq8mx.swf"],
["Papa's Freezeria","papas-freezeria/PrM65sUhio0RzE.swf"],
["Papa's Hotdoggeria","papas-hotdoggeria/0uAAY0zUH8ptip.swf"],
["Papa's Pancakeria","papas-pancakeria/lDqIRzC40giFxR.swf"],
["Papa's Pastaria","papas-pastaria/papas-pastaria.swf"],
["Papa's Pizzeria","papas-pizzeria/papaspizzaria.swf"],
["Papa's Scooperia","papas-scooperia/Wd6AuFoiKHe4Hx.swf"],
["Papa's Sushiria","papas-sushiria/P8ti1E0hWBdaGy.swf"],
["Papa's Taco Mia","papas-taco-mia/SQyvNBxOG2f1Uq.swf"],
["Papa's Wingeria","papas-wingeria/hTKOPAtRceVKuC.swf"],
["PC Breakdown","PC-breakdown/PC Breakdown.swf"],
["Riddle School 1","Riddle-school-1/Riddle School.swf"],
["Riddle School 2","riddle-school-2/riddleschool2.swf"],
["Riddle School 3","Riddle-School-3/Riddle School 3.swf"],
["Riddle School 4","Riddle-School-4/Riddle School 4.swf"],
["Riddle School 5","Riddle-School-5/Riddle School 5.swf"],
["Run 2","run-2/Run-2.swf"],
["Super Mario 63","SM63/supermario63.swf"],
["Tetris","tetris/flashtetris.swf"],
["Wheely","wheely-1/wheely-1.swf"]
];

function rodar(url) {
  var r = window.RufflePlayer.newest();
  var p = r.createPlayer();
  p.style.width = "100%";
  p.style.height = "100%";
  var c = document.getElementById("play");
  c.innerHTML = "";
  c.appendChild(p);
  p.load(url);
}

function montar() {
  var h = "";
  for (var i = 0; i < SWFS.length; i++) {
    h += "<li><a href=\"?swf=" + encodeURIComponent(SWFS[i][1]) + "\">" + SWFS[i][0] + "</a></li>";
  }
  document.getElementById("lista").innerHTML = h;

  var q = new URLSearchParams(location.search);
  var f = q.get("swf");
  if (f) {
    document.getElementById("menuwrap").style.display = "none";
    rodar(f);
  }

  document.getElementById("lista").addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (a) {
      var f2 = new URL(a.href, location.href).searchParams.get("swf");
      if (f2) { e.preventDefault(); document.getElementById("menuwrap").style.display = "none"; rodar(f2); }
    }
  });

  document.getElementById("swffile").addEventListener("change", function () {
    if (!this.files.length) return;
    document.getElementById("menuwrap").style.display = "none";
    rodar(URL.createObjectURL(this.files[0]));
  });

  document.getElementById("panic").addEventListener("click", function (e) {
    e.preventDefault();
    location.replace("https://www.google.com");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "`") { e.preventDefault(); location.replace("https://www.google.com"); }
  });
}

window.addEventListener("DOMContentLoaded", montar);