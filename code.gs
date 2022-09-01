//ファイル名は「名前__日時」に変更
function myFunction(e) {
  var itemResponse;
  var fileName;
  var movie;
  var no = 1;    // ファイルアップロード時の連番
  
  //回答のオブジェクトを取得
  var itemResponses = e.response.getItemResponses();
  
  // １番目の回答を名前として取得する
  itemResponse = itemResponses[0];
  fileName = itemResponse.getResponse() + '_' + dateToStr24HPad0(new Date(), 'YYYYMMDDhhmmss');
  
  // 画像をアップロードする質問の順番を入力(n番目の質問はn-1で入力)
  // ls = [2, 4] であれば，３番目と５番目の質問が画像のupload
  var ls = [2, 4];

  // ファイルの回答結果を取得する
  for (var i = 0; i < ls.length; i++) {
    itemResponse = itemResponses[ls[i]];
    itemResponse.getResponse().forEach(function( uploadFile ) {
      movie = DriveApp.getFileById(uploadFile);
      var ext = getExt(movie.getName());
      movie.setName(fileName + '_' + no + '.' + ext);
      no++;
    });
  }
}

// フォーマットする自作関数
function dateToStr24HPad0(date, format) {
    
  if (!format) {
  // デフォルト値
    format = 'YYYY/MM/DD hh:mm:ss'
  }
    
  // フォーマット文字列内のキーワードを日付に置換する
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    
  return format;
}

// 拡張子を取得
function getExt(filename) {
    return filename.match(/[^.]+$/);
}
