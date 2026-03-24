/**
 * @name Oneko
 * @author VWilk
 * @authorId 363358047784927234
 * @version 1
 * @description Cat follows your cursor (Go check out vencord's code ( I just ported it to BD :) https://github.com/Vendicated/Vencord/tree/main/src/plugins/oneko which was based off of Adryd's code.)
 * @source https://github.com/VWilk/Oneko_BetterDiscord/
 */


module.exports = meta => {
  return {
    start: () => {
      fetch("https://raw.githubusercontent.com/adryd325/oneko.js/8fa8a1864aa71cd7a794d58bc139e755e96a236c/oneko.js")
      .then(x => x.text())
      .then(s => s.replace("./oneko.gif", "https://raw.githubusercontent.com/adryd325/oneko.js/14bab15a755d0e35cd4ae19c931d96d306f99f42/oneko.gif")
          .replace("(isReducedMotion)", "(false)"))
      .then(eval);
    },
    stop: () => {
      const element = document.getElementById("oneko");
      if (element) {
          element.remove();
      }
    }
  }
};