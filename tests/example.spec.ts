// split (" ")
function mostCommonWord(paragraph: string, banned: string[]) {
    let s = paragraph.toLowerCase().replace(/[!?',;.]/g, " ").split(" ");
    console.log(s);
  }

  mostCommonWord("Bob hit a ball, the hit BALL flew far after it was hit.", ["hit"]);

