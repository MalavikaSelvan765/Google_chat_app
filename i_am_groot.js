/* Creating an object called REASON and assigning it two properties, Groot and Rocket. */
var REASON = {
  Groot: "I am Groot!",
  Rocket: "Hey You",
};

/* Declaring a variable called DEFAULT_IMAGE_URL and assigning it a value. */
var DEFAULT_IMAGE_URL =
  "https://cdn.dribbble.com/users/1308090/screenshots/3470998/groot_dance_v3.gif";

/* Creating a variable called ROCKET_IMAGE_URL and assigning it a value of a URL to an image. */
var ROCKET_IMAGE_URL =
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3956fa52363125.5a5ac4b2191f7.jpg";

/* Creating a JSON object with a header property. */
var HEADER = {
  header: {
    title: "Hey You Human!",
    subtitle: "We Are Guardians of Galaxy & I am the fricking Rocket!",
    imageUrl: ROCKET_IMAGE_URL,
  },
};

/**
 * If the message is "@I Am Groot! update secret", then return a card with a button that opens a
 * dialog.
 * @param event - The event object contains information about the context that caused the trigger to
 * fire.
 * @returns A card with a button that opens a dialog.
 */
function onMessage(event) {
  var name = event.user.displayName;
  var message1 = event.message.text
  Logger.log(name);
  if (event.message.slashCommand) {
    switch (event.message.slashCommand.commandId) {
      case 1: // Command Id 1
        return sendGrootPicture();
      case 2: // help
        Logger.log("Calling Help");
        return getHelp(name);
    }
  }
}


/**
 * > This function returns a card that contains a button that opens a dialog
 * @param event - The event object that was passed to the Lambda function.
 * @returns A card with a button that opens a dialog.
 */
function newSecret(event){
  return {
        "cards_v2": [{
          "card_id": "secrets",
          "card": {
            "header": {
              "title": "AWS Secret",
              "subtitle": "Create AWS Secret!",
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
                          "text": "Create Secret",
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
 * It takes an array of widgets and returns a card response with a header and a section containing
 * those widgets
 * @param widgets - An array of widgets to be displayed in the card.
 * @returns A card response with a header and a section with the widgets.
 */
function createCardResponse(widgets) {
  return {
    cards: [
      HEADER,
      {
        sections: [
          {
            widgets: widgets,
          },
        ],
      },
    ],
  };
}


/**
 * It creates a card with a paragraph and three buttons
 * @param helpSeekerName - The name of the person who asked for help.
 * @returns A card response with the widgets
 */
function getHelp(helpSeekerName) {
  reason = REASON.Rocket;
  var widgets = [
    {
      textParagraph: {
        text:
          "Okay, let's see how bad does someone wants me & Groot! Yes, human! Yeah, that's you <b>" +
          helpSeekerName +
          "</b>! How can we help?! Hurry up my man! We have a Galaxy to Guard!  Type update secret to update AWS secrtes by tagging I am groot application.",
      },
    },
    {
      buttons: [
        {
          textButton: {
            text: "Archive Mission Completed Cards",
            onClick: {
              action: {
                actionMethodName: "archiveAOSCards",
                parameters: [
                  {
                    key: "reason",
                    value: reason,
                  },
                ],
              },
            },
          },
        },
        {
          textButton: {
            text: "Sync up PCR Score",
            onClick: {
              action: {
                actionMethodName: "updatePCRScore",
                parameters: [],
              },
            },
          },
        },

        {
          textButton: {
            text: "Create Secret in AWS",
            onClick: {
              action: {
                actionMethodName: "newSecret",
                parameters: [],
              },
            },
          },
        },
      ],
    },
  ];
  return createCardResponse(widgets);
}



/**
 * The function `onCardClick` is called when a user clicks on a card. It then calls the appropriate
 * function based on the button clicked
 * @param event - This is the event object that is passed to the function. It contains the
 * actionMethodName, which is the name of the action method that was invoked.
 */
function onCardClick(event) {
  console.info(event);
  var message = "";
  var name = event.user.displayName;
  if (event.action.actionMethodName == "archiveAOSCards") {
    archiveAOSCards();
    message =
      "Racoon: Hey You " +
      name +
      "! Listen up Buddy! I told Groot to Archive Mission Completed AOS Cards!";
  } else if (event.action.actionMethodName == "updatePCRScore") {
    updatePCRScore();
    message =
      "Racoon: Hey You " +
      name +
      "! Listen up Buddy! I told Groot to Sync up PCR Score!";
  }
  else if (event.action.actionMethodName == "newSecret") {
    return newSecret(event);
  }
  else if (event.action.actionMethodName == "openDialog") {
    return openDialog(event);
  }
  else if (event.common.invokedFunction == "receiveDialog") {
    return receiveDialog(event);
  }
  else if (event.common.invokedFunction == "createAwsSecret") {
    createAwsSecret();
    message =
      "Racoon: Hey You " +
      name +
      "! Listen up Buddy! I told Groot to Create an AWS Secret!";
  }
  else {
    message = "I'm sorry; I'm not sure which button you clicked.";
  }
  return { text: message };

}


/**
 * It calls the Rundeck API to run a job, and then calls another function to check the status of the
 * job
 */
function archiveAOSCards() {
  let url =
    "https://iamgroot.zingworks.com/api/41/job/23f93af7-52be-4a55-9830-1fb9cf923646/run";
  let config = {
    method: "post",
    headers: {
      "X-Rundeck-Auth-Token": "Uhoj6U5ITCtorlw9mDOvGZwU6ZlyuGDy",
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie:
        "JSESSIONID=node0a3yubggvpmfud3kbux94jf3m33.node0; JSESSIONID=node01of4u4p88k7rm1b9c6ifku2goj47.node0",
    },
  };
  let response = UrlFetchApp.fetch(url, config);
  Logger.log(response);
  var json = response.getContentText(); // get the response content as text
  var data = JSON.parse(json);
  var job_id = data.id
  Logger.log(job_id);
  getArchiveAOSCardsStatus(data.id);
}


/**
 * It's a function that updates the PCR score of a particular user
 */
function updatePCRScore() {
  let url =
    "https://iamgroot.zingworks.com/api/41/job/fb9c2288-eeb3-4a1e-989a-235a67fde30d/run";
  let config = {
    method: "post",
    headers: {
      "X-Rundeck-Auth-Token": "Uhoj6U5ITCtorlw9mDOvGZwU6ZlyuGDy",
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie:
        "JSESSIONID=node0a3yubggvpmfud3kbux94jf3m33.node0; JSESSIONID=node01of4u4p88k7rm1b9c6ifku2goj47.node0",
    },
  };
  let response = UrlFetchApp.fetch(url, config);
  Logger.log(response);
  var json = response.getContentText();
  var data = JSON.parse(json);
  Logger.log(data.id);
}



/**
 * It fetches the status of a rundeck job by passing the rundeck job ID as a parameter
 * @param rundDeckID - The ID of the job you want to get the status of.
 */
function getArchiveAOSCardsStatus(rundDeckID) {
  let url =
    "https://iamgroot.zingworks.com/api/41/execution/" + rundDeckID + "/output";
  let config = {
    method: "post",
    headers: {
      "X-Rundeck-Auth-Token": "Uhoj6U5ITCtorlw9mDOvGZwU6ZlyuGDy",
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie:
        "JSESSIONID=node0a3yubggvpmfud3kbux94jf3m33.node0; JSESSIONID=node01of4u4p88k7rm1b9c6ifku2goj47.node0",
    },
  };
  let response = UrlFetchApp.fetch(url, config);
  Logger.log(response);
  var json = response.getContentText(); // get the response content as text
  var data = JSON.parse(json);
  Logger.log(data.entries);
}



/**
 * This function is used to create a secret in AWS Secrets Manager
 * @param event - This is the event object that is passed to the function. It contains the data that is
 * passed from the form.
 * @returns The secret is being updated.
 */
function createAwsSecret(event) {
  let region1 =  event.common.formInputs.region[""].stringInputs.value[0];
  let secretName1 =  event.common.formInputs.secretName[""].stringInputs.value[0];
  let secretKey1 =  event.common.formInputs.secretKey[""].stringInputs.value[0];
  let secretValue1 =  event.common.formInputs.secretValue[""].stringInputs.value[0];

  let url =
    "https://iamgroot.zingworks.com/api/41/job/c6ff53d8-c36a-4e63-8363-d1b74375ded6/run";
  let config = {

    method: "post",
    headers: {
      "X-Rundeck-Auth-Token": "Uhoj6U5ITCtorlw9mDOvGZwU6ZlyuGDy",
      Accept: "application/json",
      Cookie:
        "JSESSIONID=node0a3yubggvpmfud3kbux94jf3m33.node0; JSESSIONID=node01of4u4p88k7rm1b9c6ifku2goj47.node0",
    },
    payload: JSON.stringify({ "argString": ` -region ${region1} , -secret_name ${secretName1} , -secret_key ${secretKey1} , -secret_value ${secretValue1}`}),
    // payload: JSON.stringify({ "argString": ` -region ${region} , -secret_name malavika , -secret_key key , -secret_value 12345`}),
    contentType: "application/json"
  };
  let response = UrlFetchApp.fetch(url, config);
  Logger.log(config);
  var json = response.getContentText(); // get the response content as text
  Logger.log(json);
  return { text: "The secret is being updated."}

}



/**
 * It returns a JSON object that contains a card with a header and a section. The header contains a
 * title, subtitle, imageUrl, and imageStyle. The section contains a widget that contains an image with
 * an imageUrl and onClick.
 * @returns A card with a header and a section.
 */
function sendGrootPicture() {
  return {
    cards: [
      {
        header: {
          title: "I Am Groot!",
          subtitle: "We Are Groots!",
          imageUrl:
            "https://cdn.dribbble.com/users/1308090/screenshots/3470998/groot_dance_v3.gif",
          // "imageUrl": "https://i.pinimg.com/474x/07/5d/66/075d66ff0dd6d88bc3f1bc9e698eb8d9--logo-basketball-basketball-jersey.jpg",
          imageStyle: "IMAGE",
        },
        sections: [
          {
            widgets: [
              {
                image: {
                  imageUrl:
                    "https://cdn.dribbble.com/users/1229329/screenshots/3822290/dancing_baby_groot.gif",
                  onClick: {
                    openLink: {
                      url: "https://cdn.dribbble.com/users/1229329/screenshots/3822290/dancing_baby_groot.gif",
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  };
}




/**
 * The function openDialog() returns an object that contains an action_response object that contains a
 * dialog_action object that contains a dialog object that contains a body object that contains a
 * sections object that contains a widgets object that contains a textInput object that contains a
 * label object that contains a string
 * @param event - The event object contains the context of the event that triggered the action.
 * @returns The return value is a JSON object that contains the action response.
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
                  "header": "Add Secret",
                  "widgets": [
                    {
                      "textInput": {
                        "label": "Region",
                        "name": "region",
                        "initialSuggestions": {
                          "items": [
                            {
                              "text": "us-west-2"
                            },
                            {
                              "text": "us-west-2"
                            }
                          ]
                        }

                      }
                    },
                    {
                      "textInput": {
                        "label": "Name of the secret",
                        "type": "SINGLE_LINE",
                        "name": "secretName"
                      }
                    },
                    {
                      "textInput": {
                        "label": "Key to the secret",
                        "type": "SINGLE_LINE",
                        "name": "secretKey"
                      }
                    },
                    {
                      "textInput": {
                        "label": "value to the secret",
                        "type": "SINGLE_LINE",
                        "name": "secretValue"
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
 * The function receives the event from the dialog, logs the values, and then calls the createAwsSecret
 * function.
 * @param event - This is the event object that is passed to the function.
 * @returns The function createAwsSecret is being returned.
 */
function receiveDialog(event) {
  Logger.log({"value1": event.common.formInputs.secretValue[""].stringInputs.value[0]});
  Logger.log({"value2": event.common.formInputs.secretName[""].stringInputs.value[0]});
  Logger.log({"value3": event.common.formInputs.secretKey[""].stringInputs.value[0]});
  Logger.log({"value4": event.common.formInputs.region[""].stringInputs.value[0]});
  if (event.common.formInputs.secretValue[""].stringInputs.value[0] == "") {
    return {
      "actionResponse": {
        "type": "DIALOG",
        "dialogAction": {
          "actionStatus": "Don't forget to enter the details!"
        }
      }
    };
  }
  if (event.common.formInputs.secretName[""].stringInputs.value[0] == "") {
    return {
      "actionResponse": {
        "type": "DIALOG",
        "dialogAction": {
          "actionStatus": "Don't forget to enter the details!"
        }
      }
    };
  }
  if (event.common.formInputs.secretKey[""].stringInputs.value[0] == "") {
    return {
      "actionResponse": {
        "type": "DIALOG",
        "dialogAction": {
          "actionStatus": "Don't forget to enter the details!"
        }
      }
    };
  }
  if (event.common.formInputs.region[""].stringInputs.value[0] == "") {
    return {
      "actionResponse": {
        "type": "DIALOG",
        "dialogAction": {
          "actionStatus": "Don't forget to enter the details!"
        }
      }
    };
  }
  if(event.common.formInputs.region[""].stringInputs.value[0] != event.common.formInputs.items){
    return { text: "Choose the correct value!"}
  }
  else {
    return createAwsSecret(event);
  }
}

/**
 * Responds to an ADDED_TO_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onAddToSpace(event) {
  var message = "";

  if (event.space.singleUserBotDm) {
    message =
      "Thank you for adding me to a DM, " + event.user.displayName + "!";
  } else {
    message =
      "Thank you for adding me to " +
      (event.space.displayName ? event.space.displayName : "this chat");
  }

  if (event.message) {
    // Bot added through @mention.
    message = message + ' and you said: "' + event.message.text + '"';
  }

  return { text: message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onRemoveFromSpace(event) {
  console.info(
    "Bot removed from ",
    event.space.name ? event.space.name : "this chat"
  );
}
