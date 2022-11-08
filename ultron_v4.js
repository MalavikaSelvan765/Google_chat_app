/**
 * It returns a card that contains a button that opens a dialog.
 * @param event - The event object that triggered the function.
 * @returns The return value is a JSON object that contains the card to be displayed in the chat.
 */
function onMessage(event) {
  var name = event.user.displayName;
  Logger.log(name);
  var message = event.message.text
  if (event.message.slashCommand) {
    switch (event.message.slashCommand.commandId) {
      case 1: // /health
        console.log(event)
        return cards(event);
      case 2: // /run_pcr_script
        return runscript(event);
    }
  }
}



/**
 * **The function returns a JSON object that contains a card with a button that opens a dialog.**
 *
 * The JSON object returned by the function is a [Cards
 * v2](https://developers.google.com/hangouts/chat/reference/message-formats/cards-v2) object
 * @param event - The event object contains information about the current state of the conversation.
 * @returns A card with a button that opens a dialog.
 */
function cards(event) {
  return {
    "cards_v2": [{
      "card_id": "health",
      "card": {
        "header": {
          "title": "Health check",
          "subtitle": "Check the health of your services!",
          "imageUrl": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3956fa52363125.5a5ac4b2191f7.jpg",
          "imageType": "CIRCLE"
        },
        "sections": [
          {
            "widgets": [
              {
                "buttonList": {
                  "buttons": [
                    {
                      "text": "Check health",
                      "onClick": {
                        "action": {
                          "function": "openDialog",
                          "interaction": "OPEN_DIALOG"
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    }]
  };
}


/**
 * `runscript` is a function that returns a card with a button that opens a dialog
 * @param event - The event object contains information about the context that caused the trigger to fire.
 * @returns A card with a button that opens a dialog.
 */
function runscript(event) {
  return {
    "cards_v2": [{
      "card_id": "script",
      "card": {
        "header": {
          "title": "PCR Script Runner",
          "subtitle": "Run the given script mentioed in PCR!",
          "imageUrl": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3956fa52363125.5a5ac4b2191f7.jpg",
          "imageType": "CIRCLE"
        },
        "sections": [
          {
            "widgets": [
              {
                "buttonList": {
                  "buttons": [
                    {
                      "text": "PCR Script Runner",
                      "onClick": {
                        "action": {
                          "function": "openDialog1",
                          "interaction": "OPEN_DIALOG"
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    }]
  };
}


/**
 * If the user clicks on the card, the function will check which button was clicked and then call the
 * appropriate function
 * @param event - The event object that was passed to the function.
 * @returns the event.
 */
function onCardClick(event) {
  console.info(event);
  var message= ""
  if (event.action.actionMethodName == "cards") {
    cards();
    message =
      "Racoon: Hey You " +
      name +
      "! Listen up Buddy! I told Groot to Acheck health!";
  }
  if (event.common.invokedFunction == "openDialog") {
    return openDialog(event);
  }
  if (event.common.invokedFunction == "openDialog1") {
    return openDialog1(event);
  }
  if (event.common.invokedFunction == "receiveDialog") {
    return receiveDialog(event);
  }
  if (event.common.invokedFunction == "receiveDialog1") {
    return receiveDialog1(event);
  }
  return {text: message}
}


/**
 * The function returns an object that contains an action response with a type of DIALOG. The dialog action contains a
 * dialog object that contains a body object that contains a sections object that contains a widgets object that contains a
 * textInput object that contains a label, name, and initialSuggestions object that contains an items object that contains
 * an array of objects that contain a text property
 * @param event - The event object that was passed to the Lambda function.
 * @returns A JSON object that contains the action response type, dialog action, and the dialog body.
 */
function openDialog(event) {
  return {
    "action_response": {
      "type": "DIALOG",
      "dialog_action": {
        "dialog": {
          "body": {
            "sections": [
              {
                "header": "Service's Health",
                "widgets": [
                  // {
                  //   "textInput": {
                  //     "label": "Choose A Service",
                  //     "name": "serviceName",
                  //     "initialSuggestions": {
                  //       "items": dropdown
                  //     },
                  //   }
                  // },
                  // {
                  //   "textInput": {
                  //     "label": "Choose A Region",
                  //     "name": "region",
                  //     "initialSuggestions": {
                  //       "items": [
                  //         {
                  //           "text": "US",
                  //           "selected": true
                  //         },
                  //         {
                  //           "text": "EU"
                  //         }
                  //       ]
                  //     }
                  //   }
                  // },
                  {
                    "selectionInput": {
                      "name": "serviceName",
                      "label": "Choose A Service",
                      "type": "DROPDOWN",
                      "items": [
                          {
                            "text": "accounts",
                            "value": "accounts",
                            "selected": false
                          },
                          {
                            "text": "accountsv2",
                            "value": "accountsv2",
                            "selected": false
                          },
                          {
                            "text": "admin",
                            "value": "admin",
                            "selected": false
                          },
                          {
                            "text": "adminv2",
                            "value": "adminv2",
                            "selected": false
                          },
                          {
                            "text": "route",
                            "value": "route",
                            "selected": false
                          },
                          {
                            "text": "userv2",
                            "value": "userv2",
                            "selected": false
                          },
                          {
                            "text": "process",
                            "value": "process",
                            "selected": false
                          },
                          {
                            "text": "processv2",
                            "value": "processv2",
                            "selected": false
                          },
                          {
                            "text": "datasetv2",
                            "value": "datasetv2",
                            "selected": false
                          },
                          {
                            "text": "integration",
                            "value": "integration",
                            "selected": false
                          },
                          {
                            "text": "integrationv2",
                            "value": "integrationv2",
                            "selected": false
                          },
                          {
                            "text": "project",
                            "value": "project",
                            "selected": false
                          },
                          {
                            "text": "projectv2",
                            "value": "projectv2",
                            "selected": false
                          },
                          {
                            "text": "processinternalv2",
                            "value": "processinternalv2",
                            "selected": false
                          },
                          {
                            "text": "processreportv2",
                            "value": "processreportv2",
                            "selected": false
                          },
                          {
                            "text": "datasetworker",
                            "value": "datasetworker",
                            "selected": false
                          },
                          {
                            "text": "datasetworkerv2",
                            "value": "datasetworkerv2",
                            "selected": false
                          },
                          {
                            "text": "integrationetworkerv2",
                            "value": "integrationetworkerv2",
                            "selected": false
                          },
                          {
                            "text": "projectreportv2",
                            "value": "projectreportv2",
                            "selected": false
                          },
                          {
                            "text": "projectworkerv2",
                            "value": "projectworkerv2",
                            "selected": false
                          },
                          {
                            "text": "chatv2",
                            "value": "chatv2",
                            "selected": false
                          },
                          {
                            "text": "chatworkerv2",
                            "value": "chatworkerv2",
                            "selected": false
                          },
                          {
                            "text": "casev2",
                            "value": "casev2",
                            "selected": false
                          },
                          {
                            "text": "casereportv2",
                            "value": "casereportv2",
                            "selected": false
                          },
                          {
                            "text": "flow",
                            "value": "flow",
                            "selected": false
                          },
                          {
                            "text": "flowv2",
                            "value": "flowv2",
                            "selected": false
                          },
                          {
                            "text": "flowworkerv2",
                            "value": "flowworkerv2",
                            "selected": false
                          },
                          {
                            "text": "searchv2",
                            "value": "searchv2",
                            "selected": false
                          },
                          {
                            "text": "analyticssyncv2",
                            "value": "analyticssyncv2",
                            "selected": false
                          },
                          {
                            "text": "analyticsv2",
                            "value": "analyticsv2",
                            "selected": false
                          },
                          {
                            "text": "apidocs",
                            "value": "apidocs",
                            "selected": false
                          },
                          {
                            "text": "apidocsv2",
                            "value": "apidocsv2",
                            "selected": false
                          },
                          {
                            "text": "appstorev2",
                            "value": "appstorev2",
                            "selected": false
                          },
                          {
                            "text": "appsv2",
                            "value": "appsv2",
                            "selected": false
                          },
                          {
                            "text": "auditv2",
                            "value": "auditv2",
                            "selected": false
                          },
                          {
                            "text": "auditlogv2",
                            "value": "auditlogv2",
                            "selected": false
                          },
                          {
                            "text": "auditlogworkerv2",
                            "value": "auditlogworkerv2",
                            "selected": false
                          },
                          {
                            "text": "auditworker",
                            "value": "auditworker",
                            "selected": false
                          },
                          {
                            "text": "batchuser",
                            "value": "batchuser",
                            "selected": false
                          },
                          {
                            "text": "batchuserv2",
                            "value": "batchuserv2",
                            "selected": false
                          },
                          {
                            "text": "changestreamv2",
                            "value": "changestreamv2",
                            "selected": false
                          },
                          {
                            "text": "channel",
                            "value": "channel",
                            "selected": false
                          },
                          {
                            "text": "comment",
                            "value": "comment",
                            "selected": false
                          },
                          {
                            "text": "commentv2",
                            "value": "commentv2",
                            "selected": false
                          },
                          {
                            "text": "common",
                            "value": "common",
                            "selected": false
                          },
                          {
                            "text": "commonv2",
                            "value": "commonv2",
                            "selected": false
                          },
                          {
                            "text": "communityv2",
                            "value": "communityv2",
                            "selected": false
                          },
                          {
                            "text": "digitalhubv2",
                            "value": "digitalhubv2",
                            "selected": false
                          },
                          {
                            "text": "documentparserv2",
                            "value": "documentparserv2",
                            "selected": false
                          },
                          {
                            "text": "eventsubscriptionv2",
                            "value": "eventsubscriptionv2",
                            "selected": false
                          },
                          {
                            "text": "eventworker",
                            "value": "eventworker",
                            "selected": false
                          },
                          {
                            "text": "eventworkerv2",
                            "value": "eventworkerv2",
                            "selected": false
                          },
                          {
                            "text": "formv2",
                            "value": "formv2",
                            "selected": false
                          },
                          {
                            "text": "formreportv2",
                            "value": "formreportv2",
                            "selected": false
                          },
                          {
                            "text": "formworkerv2",
                            "value": "formworkerv2",
                            "selected": false
                          },
                          {
                            "text": "gcmv2",
                            "value": "gcmv2",
                            "selected": false
                          },
                          {
                            "text": "gcmworkerv2",
                            "value": "gcmworkerv2",
                            "selected": false
                          },
                          {
                            "text": "lowcodev2",
                            "value": "lowcodev2",
                            "selected": false
                          },
                          {
                            "text": "main-client",
                            "value": "main-client",
                            "selected": false
                          },
                          {
                            "text": "marketplace",
                            "value": "marketplace",
                            "selected": false
                          },
                          {
                            "text": "marketplacev2",
                            "value": "marketplacev2",
                            "selected": false
                          },
                          {
                            "text": "metadatav2",
                            "value": "metadatav2",
                            "selected": false
                          },
                          {
                            "text": "notification",
                            "value": "notification",
                            "selected": false
                          },
                          {
                            "text": "notificationv2",
                            "value": "notificationv2",
                            "selected": false
                          },
                          {
                            "text": "notificationworker",
                            "value": "notificationworker",
                            "selected": false
                          },
                          {
                            "text": "notificationworkerv2",
                            "value": "notificationworkerv2",
                            "selected": false
                          },
                          {
                            "text": "postv2",
                            "value": "postv2",
                            "selected": false
                          },
                          {
                            "text": "report",
                            "value": "report",
                            "selected": false
                          },
                          {
                            "text": "scheduler",
                            "value": "scheduler",
                            "selected": false
                          },
                          {
                            "text": "schedulerv2",
                            "value": "schedulerv2",
                            "selected": false
                          },
                          {
                            "text": "searchworker",
                            "value": "searchworker",
                            "selected": false
                          },
                          {
                            "text": "searchworkerv2",
                            "value": "searchworkerv2",
                            "selected": false
                          },
                          {
                            "text": "stream",
                            "value": "stream",
                            "selected": false
                          },
                          {
                            "text": "teamv2",
                            "value": "teamv2",
                            "selected": false
                          },
                          {
                            "text": "traceworkerv2",
                            "value": "traceworkerv2",
                            "selected": false
                          },
                          {
                            "text": "upload",
                            "value": "upload",
                            "selected": false
                          },
                          {
                            "text": "uploadv2",
                            "value": "uploadv2",
                            "selected": false
                          },
                          {
                            "text": "workflowworkerv2",
                            "value": "workflowworkerv2",
                            "selected": false
                          },
                        ]
                    }
                  },
                  {
                    "selectionInput": {
                      "name": "region",
                      "label": "Choose A Region",
                      "type": "DROPDOWN",
                      "items": [
                        {
                          "text": "US",
                          "value": "US",
                          "selected": true
                        },
                        {
                          "text": "EU",
                          "value": "EU",
                          "selected": false
                        }
                      ]
                    }
                  },
                  {
                    "buttonList": {
                      "buttons": [
                        {
                          "text": "Submit",
                          "onClick": {
                            "action": {
                              "function": "receiveDialog",
                              "parameters": [
                                {
                                  "key": "receiveDialog",
                                  "value": "receiveDialog"
                                }
                              ]
                            }
                          }
                        }
                      ]
                    },
                    "horizontalAlignment": "END"
                  }
                ]
              }
            ]
          }
        }
      }
    }
  };
}




/**
 * The function openDialog1 is called when the user clicks on the "Open Dialog" button. The function
 * returns an action response that opens a dialog box with a text input field and a submit button. When
 * the user clicks on the submit button, the function receiveDialog1 is called.
 * @param event - The event object that triggered the action.
 * @returns an object with the action_response property.
 */
function openDialog1(event) {
  return {
    "action_response": {
      "type": "DIALOG",
      "dialog_action": {
        "dialog": {
          "body": {
            "sections": [
              {
                "header": "URL",
                "widgets": [
                  {
                    "textInput": {
                      "label": "Paste The URL Here",
                      "type": "SINGLE_LINE",
                      "name": "scriptURL"
                    }
                  },

                  {
                    "buttonList": {
                      "buttons": [
                        {
                          "text": "Submit",
                          "onClick": {
                            "action": {
                              "function": "receiveDialog1",
                            }
                          }
                        }
                      ]
                    },
                    "horizontalAlignment": "END"
                  }
                ]
              }
            ]
          }
        }
      }
    }
  };
}



/**
 * > The function receives an event, and then calls the healthCheck function, passing the event as a
 * parameter
 * @param event - The event object that was passed to the Lambda function.
 * @returns The function healthCheck is being returned.
 */
function receiveDialog(event) {
  return healthCheck(event)
}


/**
 * If the user has not entered a URL, then the dialog box will display a message saying "Don't forget
 * to enter the details!"
 *
 * If the user has entered a URL, then the dialog box will display the URL
 * @param event - The event object that is passed to the function.
 * @returns the response to the user.
 */
function receiveDialog1(event) {
  if (event.common.formInputs.scriptURL[""].stringInputs.value[0] == "") {
    return {
      "actionResponse": {
        "type": "DIALOG",
        "dialogAction": {
          "actionStatus": "Don't forget to enter the details!"
        }
      }
    };
  }
  else {
    return giveurl(event);
  }
}


/**
 * The function takes the region and service name as input from the form and then uses the Rundeck API
 * to trigger a job with the region and service name as arguments
 * @param event - This is the event object that is passed to the function. It contains the form inputs
 * and other information.
 * @returns The status is being checked.
 */
function healthCheck(event) {
  let region1 = event.common.formInputs.region[""].stringInputs.value[0];
  Logger.log({ "region": region1 })
  let service = event.common.formInputs.serviceName[""].stringInputs.value[0];
  let url =
    "https://iamgroot.zingworks.com/api/41/job/de51ed87-68ef-4bc4-b721-fbe422cfb846/run";
  let config = {
    method: "post",
    headers: {
      "X-Rundeck-Auth-Token": "Uhoj6U5ITCtorlw9mDOvGZwU6ZlyuGDy",
      Accept: "application/json",
      Cookie:
        "JSESSIONID=node0a3yubggvpmfud3kbux94jf3m33.node0; JSESSIONID=node01of4u4p88k7rm1b9c6ifku2goj47.node0",
    },
    payload: JSON.stringify({ "argString": ` -region ${region1} , -service_name ${service}` }),
    contentType: "application/json"
  };
  let response = UrlFetchApp.fetch(url, config);
  Logger.log(config);
  var json = response.getContentText();
  Logger.log(json);
  return { text: "The status is being checked." }

}



/**
 * The function takes the URL from the form and passes it to the Rundeck API
 * @param event - This is the event object that is passed to the function. It contains the form inputs
 * and other information.
 * @returns The status is being checked.
 */
function giveurl(event) {
  let url1 = event.common.formInputs.scriptURL[""].stringInputs.value[0];
  Logger.log(url1);
  let url = "https://iamgroot.zingworks.com/api/41/job/1e98cadd-c992-4517-9516-3dd95e3eb6d6/run";
  let config = {
    method: "post",
    headers: {
      "X-Rundeck-Auth-Token": "Uhoj6U5ITCtorlw9mDOvGZwU6ZlyuGDy",
      Accept: "application/json",
      Cookie:
        "JSESSIONID=node0a3yubggvpmfud3kbux94jf3m33.node0; JSESSIONID=node01of4u4p88k7rm1b9c6ifku2goj47.node0",
    },
    payload: JSON.stringify({ "argString": `-script_url ${url1}` }),
    contentType: "application/json"
  };
  let response = UrlFetchApp.fetch(url, config);
  Logger.log(config);
  var json = response.getContentText();
  Logger.log(json);
  return { text: "The status is being checked." }

}



/**
 * Responds to an ADDED_TO_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onAddToSpace(event) {
  var message = "";

  if (event.space.singleUserBotDm) {
    message = "Thank you for adding me to a DM, " + event.user.displayName + "!";
  } else {
    message = "Thank you for adding me to " +
      (event.space.displayName ? event.space.displayName : "this chat");
  }

  if (event.message) {
    // Bot added through @mention.
    message = message + " and you said: \"" + event.message.text + "\"";
  }

  return { "text": message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onRemoveFromSpace(event) {
  console.info("Bot removed from ",
    (event.space.name ? event.space.name : "this chat"));
}
