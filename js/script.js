const  hadithbutton=document.querySelector(".title .btnn"),
       hadithsection=document.querySelector(".hadith");
       hadithbutton.addEventListener("click",()=>{
       hadithsection.scrollIntoView({
            behavior:"smooth"
        })        
      })

const fixednav=document.querySelector(".header"),
      scrollbutton=document.querySelector(".scrollbutton");

window.addEventListener("scroll",()=>{
    window.scrollY>100?fixednav.classList.add('active'):fixednav.classList.remove('active');
    window.scrollY>500?scrollbutton.classList.add('active'):scrollbutton.classList.remove('active')
})
scrollbutton.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})
// -----------------------hadith------------------------
let hadithcontainer=document.querySelector(".hadithcontainer"),
    prev=document.querySelector(".prev"),
    next=document.querySelector(".next"),
    num=document.querySelector(".num");
let hadithindex=0;

hadith();
function hadith(){
  fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
  .then(response=>response.json())
  .then(data=>{
    // console.log(data)
    let hadiths=data.data.hadiths;
    // console.log(hadiths)

    changehadith();
    prev.addEventListener("click" ,() =>{
        hadithindex===0?hadithindex=299:hadithindex--;
        changehadith();
    })
    next.addEventListener("click" ,() =>{
        hadithindex===299?hadithindex=0:hadithindex++;
        changehadith();
    })
    function changehadith(){
        hadithcontainer.innerText=hadiths[hadithindex].arab;
        num.innerText=`300 - ${hadithindex+1}`;
    }
  })
}
// -----------------------section--------------
const section=document.querySelectorAll("section"),
      links=document.querySelectorAll(".header ul li");
      links.forEach(link=>{
        link.addEventListener("click" , ()=>{
            document.querySelector(".header ul li.active").classList.remove('active')
            link.classList.add('active')
            let target=link.dataset.filter;
            section.forEach(section=>{
                if(section.classList.contains(target)){
                    section.scrollIntoView({
                        behavior:"smooth"
                    })
                }
            })
        })
      })

// ---------------------------quran---------------------------------------------
const souracontainer=document.querySelector(".souracontainer");
getsoura()
function getsoura(){
    fetch("http://api.alquran.cloud/v1/meta")
    .then(response=>response.json())
    .then(data=>{
        // console.log(data)
        let soura=data.data.surahs.references;
        // console.log(soura)
        let numofsoura=114;
        for (let i = 0; i < numofsoura; i++) {
            souracontainer.innerHTML+=
            `
                 <div class="soura">
                 <p>${soura[i].name}</p>
                 <p>${soura[i].englishName}</p>
                 </div>
            `
            
        }
        const souratitle=document.querySelectorAll('.soura');
        const popup=document.querySelector('.souragroup');
        const ayatcontainer=document.querySelector('.ayat');
        console.log(souratitle)
         
        souratitle.forEach((title,index)=>{
            // console.log(title)
            // console.log(index)
            title.addEventListener("click",()=>{
                fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                .then(response=>response.json())
                .then(data=>{
                    console.log(data)
                    ayatcontainer.innerHTML="";
                    let ayatt=data.data.ayahs;
                    ayatt.forEach(aya=>{
                        popup.classList.add('active');
                        ayatcontainer.innerHTML+=
                        `
                        <p>${aya.numberInSurah}-${aya.text}</p>

                        `
                    })
                })
            })

        })
       let closegroup=document.querySelector(".closegroup");
       closegroup.addEventListener("click",()=>{
        popup.classList.remove('active');
       })
        
    })

}
// ---------------------------------prayer-------------------------------------
let cards=document.querySelector(".cards");
prayertime();
function prayertime(){
   fetch("http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt%20Arab%20Emirates&method=8")
   .then(response=>response.json())
   .then(data=>{
    let timings=data.data.timings;
    cards.innerHTML=""
    for(let time in timings){
        cards.innerHTML+=
        `
            <div class="cardd">
                <div class="circle">
                    <svg>
                        <circle cx="100" cy="100" r="100"></circle>
                    </svg>
                <div class="praytime">${timings[time]}</div>
                </div>
                <p>${time}</p>
            </div>
        `
    }
   })
}
// ---------------------------------sidebar-----------------------------------------------
let bars=document.querySelector(".bars"),
    sidebar=document.querySelector(".header ul");

    bars.addEventListener("click",()=>{
        sidebar.classList.toggle('active')
    })
