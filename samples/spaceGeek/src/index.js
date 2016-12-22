/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "There are around one hundred breeds of domestic cats.",
    "Domestic cats spend about seventy percent of the day sleeping.",
    "The average cat has a sense of hearing that is five times as strong as the average human",
    "The Ancient Egyptian word for cat was mau, which means to see.",
    "Cats will talk back to you the more they are spoken to.",
    "Cats take between twenty and forty breaths per minute.",
    "Cats have thirty teeth.",
    "A domestic cat can sprint to speeds around thirty miles per hour",
    "The Jaguar is the only big cat that does not roar",
    "Most cats do not have eyelashes.",
    "Cats can jump up to five times their height.",
    "The average lifespan for a domestic cat is fourteen years.",
    "The ancestor of all domestic cats is the African Wild Cat which still exists today",
    "The average cat has twenty-four whiskers, consisting of four horizontal rows on each side.",
    "A group of cats is called a clowder.",
    "A group of kittens is called a kindle.",
    "Most cats are lactose intolerant.  Stop giving them milk or ice cream.",
    "Cats can only sweat through their paws.",
    "Some cats can survive falls from around sixty-five feet or higher.",
    "Cats can make over one hundred sounds.",
    "Cats sleep on average between sixteen and eighteen hours per day.",
    "Cats have five toes on their front paws and four on each back paw.",
    "In ancient Egypt, cat owners would mourne the loss of their pet by shaving their eyebrows.",
    "Maine Coons represent the largest breed of domestic cats.",
    "The scientific name for a hairball is bezoar.",
    "A cat's heart rate is almost double that of the human heart at one hundred ten to one hundred forty beats per minute.",
    "Cat ownership can reduce the risk of heart attacks and strokes by more than a third.",
    "Adult cats only meow to communicate with humans.",
    "Cats have over one hundred sounds in their vocal repertoire, while dogs only have ten.",
    "Cats are unable to see directly below their noses.",
    "Cats are believed to be the only mammals that cannot taste sweetness.",
    "Cats have two hundred and thirty bones compared to humans which have two hundred and six.",
    "In ancient Egypt, killing a cat was punishable by death."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};
