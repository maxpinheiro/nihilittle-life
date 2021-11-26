import { Career } from "./CAREERS";

export default {
  "GRADE_SCHOOL": {
    "points": 3,
    "prompt": "Choose what to do during recess:",
    "choices": [
      {
        "type": "athlete",
        "decision": "Play soccer on the field"
      },
      {
        "type": "artist",
        "decision": "Draw with chalk on the ground"
      },
      {
        "type": "programmer",
        "decision": "Play games on your calculator"
      },
      {
        "type": "politician",
        "decision": "Tell a story to the other kids"
      },
      {
        "type": "scientist",
        "decision": "Explore the anthill on the sidewalk"
      },
      {
        "type": "writer",
        "decision": "Read your book"
      }
    ]
  },
  "HIGH_SCHOOL": [
    {
      "points": 1,
      "prompt": "Build Your Schedule (choose 3 classes):",
      "choices": [
        {
          "type": "athlete",
          "decision": "Gym"
        },
        {
          "type": "artist",
          "decision": "Studio Art"
        },
        {
          "type": "programmer",
          "decision": "Web Design"
        },
        {
          "type": "politician",
          "decision": "Debate"
        },
        {
          "type": "scientist",
          "decision": "Chemistry"
        },
        {
          "type": "writer",
          "decision": "Creative Writing"
        }
      ]
    },
    {
      "points": 2,
      "prompt": "Choose your extracurricular",
      "choices": [
        {
          "type": "athlete",
          "decision": "Join the basketball team!"
        },
        {
          "type": "artist",
          "decision": "Join the Photography Club!"
        },
        {
          "type": "programmer",
          "decision": "Join the robotics team!"
        },
        {
          "type": "politician",
          "decision": "Run for student body president!"
        },
        {
          "type": "scientist",
          "decision": "Join the science olympiads!"
        },
        {
          "type": "writer",
          "decision": "Write for the student magazine!"
        }
      ]
    }
  ],
  "COLLEGE": {
    "names":  {
      "athlete": "Marino Athletic Institute",
      "artist": "Maxwell Davis School of Arts",
      "programmer": "Hescott College of Computer Science",
      "politician": "Minaj School of Political Science",
      "scientist": "Nye College of Science",
      "writer": "Fitzgerald School of Literary Arts"
    }
  },
  "CAREER_CONCENTRATIONS": {
    "careers" : {
    "athlete": {
      "true": [Career.PROFESSIONAL_ATHLETICISM, Career.PHYSICAL_THERAPY, Career.ATHLETIC_TRAINING],
      "false": [Career.COACHING, Career.PERSONAL_TRAINING, Career.SPORTS_OFFICATING]
    },
    "artist": {
      "true": [Career.GRAPHIC_DESIGN, Career.FINE_ARTS, Career.ART_HISTORY],
      "false": [Career.PUBLIC_ART, Career.GRAPHIC_DESIGN, Career.FINE_ARTS, Career.GLASS_BLOWING]
    },
    "programmer": {
      "true": [Career.CYBERSECURITY, Career.ARTIFICIAL_INTELLIGENCE, Career.WEB_DEV, Career.SWE],
      "false": [Career.WEB_DEV, Career.IT, Career.HACKER]
    },
    "politician": {
      "true": [Career.SOCIAL_JUSTICE, Career.POLITICAL_THEORY, Career.INTERNATIONAL_RELATIONS],
      "false": [Career.CITY_COUNCIL, Career.CHARITY_ADMISTRATION, Career.MOTIVATION_SPEAKING]
    },
    "scientist": {
      "true": [Career.BIOLOGY, Career.PHYSICS, Career.CHEMISTRY, Career.ENGINEER],
      "false": [Career.PHARMA, Career.DRUG_PRODUCER, Career.ELECTRICAL_WORK]
    },
    "writer": {
      "true": [Career.CREATIVE_WRITING, Career.JOURNALISM, Career.POETRY],
      "false": [Career.EDITOR, Career.COPY_WRITER, Career.CREATIVE_WRITING, Career.POETRY]
    }
  }
  },

  "CAREER1" : {
     [Career.PROFESSIONAL_ATHLETICISM] : {
      "prompt" : "You have been drafted by the Boston Boneheads! How do you raise team moral and make new friends?",
      "options" : ["a team handshake", "sharing intimate and genuine moments of friendship", "snacks"]
    },
    [Career.PHYSICAL_THERAPY]: {
      "prompt" : "You have a new patient as a physical therapist: a young man who has been injured while sking and tiktoking simultaneously.\n What is your first method of treatment.",
      "options" : ["cryotherapy", "massage and exercise", "elbow grease"]
    },
    [Career.ATHLETIC_TRAINING]: {
      "prompt" : "You have been hired to train B-Rod! \n Which of his problem areas do you pick to work on first",
      "options" : ["his shameful calves", "his hairline muscles", "his flabby lobes"]
    },
    [Career.COACHING]: {
      "prompt" : "You have been hired to coach an elite high school baseball team! \n They have suffered a crushing blow losing to a little league team, how do you coach them back to greatness?",
      "options" : ["training montage", "new outfits!", ""]
    },
    [Career.PERSONAL_TRAINING]: {
      "prompt" : "You have been hired to train Cicholas Nage for an upcoming role! \n Which of his problem areas do you pick to work on first",
      "options" : ["his shameful calves", "his hairline muscles", "his flabby lobes"]
    },
    [Career.SPORTS_OFFICATING]: {
      "prompt" : "You are officiating your first soccer game. One player taps the other on the shoulder, the tapped player collapses to the ground, what's your call?",
      "options" : ["foul!", "look the other way", "make them hug it out"]
    },
    [Career.POETRY]: {
      "prompt" : "What would you choose to rhyme with stack",
      "options" : ["hell and back", "you look like a snack", "my heart grows ashen and black"]
    }
  }
}