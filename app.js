const pageCount = 3;

$(document).ready(function () {
  $('#printBtn').prop('disabled', true);
});

function cutText() {
  const text = $('#text').val();
  addTextToParagraphs(text);
  $('#printBtn').prop('disabled', false);
}

function createParagraphList(baseSelector) {
  let pList = [];
  const pages = $(baseSelector).empty();
  pages.append($('<h3>Print preview</h3>').addClass('no-print'))
  for (let i=0;i<pageCount;i++) {
    const p = $('<p></p>')
      .attr("id", "canvas"+i)
      .addClass('max-size-100perc')
      .addClass('bigLetters');
    const div = $('<div/>')
      .addClass('pagebreak')
      .addClass('borderaround')
      .addClass('fit-screen')
      .append(p)
    pages.append($('<div>')
      .addClass('no-print')
      .html('Page ' + (i+1) + ' of ' + pageCount)
    );
    pages.append(div);
    pList.push(p);
  }
  return pList;
}

function addTextToParagraphs(text) {
  const paragraphs = createParagraphList('#pages');

  for (let i=0; i < text.length; i++) {
    const visibleOnPage = getRandomInt(0, pageCount);
    for (let pi=0; pi<pageCount; pi++) {
      const letter = $('<span>'+text[i]+'</span>');
      if (pi !== visibleOnPage) {
        letter.addClass('hiddenLetter');
      }
      paragraphs[pi].append(letter);
    }
  }
}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
