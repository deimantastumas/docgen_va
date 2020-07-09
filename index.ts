/**
 * Handles post request
 * @param req
 */
function doPost(req: GoogleAppsScript.Events.DoPost) {
  const reqJson = JSON.parse(req.postData.contents);
  const response = createDocument(reqJson);
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Form a batch of requests for tag substitutions
 * @param request
 */
function findSubstitutions(request: any) {
  var requests = [];
  for (const value in request.values) {
    const replaceValue = request.values[value].toString();
    const req = {
      replaceAllText: {
        containsText: {
          text: `[${value}]`,
          matchCase: true,
        },
        replaceText: replaceValue,
      },
    };
    requests.push(req);
  }
  return requests;
}

/**
 * Forms a pdf file from a template
 * @param request
 */
function createDocument(request: any) {
  // clone a document
  const templateFile = DriveApp.getFileById(request.template_id);
  const currentFile = templateFile.makeCopy();
  currentFile.setName(request.id);

  // collect requests with necessary substitutions
  const requests = findSubstitutions(request);

  // substitute values
  const replies = Docs.Documents.batchUpdate(
    { requests: requests },
    currentFile.getId()
  ).replies;

  // form pdf file
  const fileHandler = currentFile.getAs('application/pdf');
  fileHandler.setName(`${currentFile.getName()}.pdf`);

  const pdfFile = DriveApp.getFolderById(request.directory_id).createFile(
    fileHandler
  );
  pdfFile.setSharing(FILE_ACCESS, FILE_PERMISSION);

  // delete a temp doc file
  DriveApp.removeFile(currentFile);

  return {
    url: pdfFile.getUrl(),
    replies: replies,
  };
}
