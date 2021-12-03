const aktivo = {
  // App
  app: {
    history: [],
    currentPage: "",
    currentUser: "demo",
  },

  // Input
  inputs: {
    showNavBar: false,

    administer: {
      group: {
        edit: false,
        addedToTemp: false, // becomes true when temp is a new group.
        index: 2,
        returnPage: "",
        temp: {},
      },
      person: {
        edit: false,
        addedToTemp: false, // becomes true when temp is a new person.
        index: 0,
        returnPage: "",
        temp: {},
      },
    },

    newActivity: {
      returnPage: "",
      chosenGroups: [],
      chosenPeople: [],
      filter: {
        people: [],
        activity: [],
      },
    },

    newActivitySimple: {
      ageGroups: [
        {
          age: "60+",
          amount: 0,
        },
        {
          age: "30-59",
          amount: 0,
        },
        {
          age: "18-29",
          amount: 0,
        },
        {
          age: "13-17",
          amount: 0,
        },
        {
          age: "7-12",
          amount: 0,
        },
        {
          age: "3-6",
          amount: 0,
        },
        {
          age: "0-2",
          amount: 0,
        },
      ],
    },

    myProfile: {
      returnPage: "",
    },

    editPassword: {
      oldPassword: "",
      password: "",
      repeatPassword: "",
    },

    editEmail: {
      email: "",
      repeatEmail: "",
    },
  },

  // Data
  data: {
    activities: [
      {
        name: "Bingo",
        description:
          "Bingo er et sjansespill der tilfeldige sifre trekkes, og spillerne deretter markerer de aktuelle sifrene på ferdigtrykkede ruteskjemaer med tall inni. Her er det gjerne fine premier og servering av noe søtt.",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["21-40", 0],
          ["41-100", 0],
          ["100+", 0],
        ],
        exfilters: [],
      },
      {
        name: "Bowling",
        description:
          "Bowling er en kjent og kjær sport som passer de aller fleste (ikke bare Columbine).",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["21-40", 0],
          ["41-100", 0],
          ["100+", 0],
        ],
        exfilters: [],
      },
      {
        name: "Snøballkasting",
        description:
          "Overrask tilfeldig forbipasserende med surprise snow in face experience 3000!",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["21-40", 0],
          ["41-100", 0],
          ["100+", 0],
        ],
        exfilters: [],
      },
      {
        name: "Paintball",
        description: "Mal ungene dine. Family fun!",
        filters: [
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
          ["100+", 0],
        ],
        exfilters: ["1", "2", "3", "4", "5"],
      },
      {
        name: "Curling",
        description:
          "Et sosialt lagspill på is. Dra med typen og la han sveipe gulvet for en gangs skyld!",
        filters: [],
        exfilters: ["1"],
      },
      {
        name: "Kabal",
        description: "Hvis du ikke har noe bedre å gjøre",
        filters: [["1", 0]],
        exfilters: [],
      },
      {
        name: "Sjakk",
        description: "Hvis du heter Bjørn eller Tarjay",
        filters: [
          ["2", 0],
          ["Not stiuuupidd", 0],
        ],
        exfilters: ["stiuuupidd"],
      },
      {
        name: "Brettspill",
        description: "F.eks monopol",
        filters: [
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
        ],
        exfilters: ["1", "2"],
      },
      {
        name: "Kortspill",
        description: "F.eks poker, amerikaner, osv.",
        filters: [
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
        ],
        exfilters: ["1", "2"],
      },
      {
        name: "Dataklubb",
        description: "For nerds.",
        filters: [
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
        ],
        exfilters: ["1", "2"],
      },
      {
        name: "Dans",
        description: "",
        filters: [
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
        ],
        exfilters: ["1", "2", "bevegelseshemmet"],
      },
      {
        name: "Kino",
        description: "`Nuff said",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [],
      },
      {
        name: "Karaoke",
        description: "Det alle de kule kidsa gjør i asia",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["Sang", 0],
          ["Musikk", 0],
        ],
        exfilters: [],
      },
      {
        name: "Frokostgruppe",
        description: "`Nuff said",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [],
      },
      {
        name: "Glassfusing",
        description: "`Nuff said",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [],
      },
      {
        name: "Herrecafé og herregruppe",
        description: "Aktiviteten sier det meste..",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
          ["Gay", 0],
          ["Kun menn", 0],
        ],
        exfilters: ["kvinne"],
      },
      {
        name: "Veving",
        description: "Bare vev.",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [],
      },
      {
        name: "Strikking",
        description: "For chicks (?)",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: ["Kun menn"],
      },
      {
        name: "Sying",
        description: "",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Brodering",
        description: "",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Lage blomsteroppsatser",
        description: "",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Kveldsmatgruppe",
        description: "For chicks?",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Lesegruppe",
        description: "For nerds.",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Male",
        description: "",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Tegne",
        description: "",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Lage kort",
        description: "",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Pynte til jul",
        description: "Det sies at dette kan gjøres hele året",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Petanque",
        description: "Aldri hørt om",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Quiz",
        description: "",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Gruble",
        description: "Morsom hjernetrim!",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Kryssord",
        description: "",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
      {
        name: "Trening",
        description: "",
        filters: [
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6-7", 0],
          ["8-10", 0],
          ["11-20", 0],
          ["21-40", 0],
          ["41-100", 0],
        ],
        exfilters: [""],
      },
    ],
    users: [
      {
        username: "demo",
        password: "demo",
        email: "demo@demo.com",
        fullName: "",
        people: [
          {
            name: "Turid",
            filters: ["40-60"],
          },
          {
            name: "Arne",
            filters: ["25-40"],
          },
          {
            name: "Rolf",
            filters: ["60+"],
          },
          {
            name: "Karl",
            filters: ["12-16"],
          },
          {
            name: "Sofie",
            filters: ["16-25"],
          },
          {
            name: "Mats",
            filters: ["6-12"],
          },
          {
            name: "Ida",
            filters: ["3-6"],
          },
        ],
        groups: [
          {
            name: "Group1",
            members: ["Turid", "Arne"],
          },
          {
            name: "Group2",
            members: ["Turid", "Rolf"],
          },
          {
            name: "Group3",
            members: ["Arne", "Rolf"],
          },
        ],
        archive: [
          // can be limited to a number (for example the 20 most recently modified).
          {
            // needs conditional handling if it's an old search and changes have occured to members and/or their filters.
            date: "", // date of last modification.
            members: {
              groups: [
                {
                  name: "", // name of the group (to identify it from users[index].groups)
                  members: [], // perhaps only added if the group isn't whole..
                },
              ],
              people: [], // people who aren't in the added groups.
              list: [], // every member is listed here. updates whenever groups or people is changed. if old this list should perhaps be moved to members.people so that people don't disappear do to originating from groups they are no longer in.
            },
            filters: {
              members: [], // collection of members' filters. is recreated when archive.members.list is modified (and (if old) also when reinitiated (or perhaps ask user if they want to update filters based on changes to members' filters)).
              added: [], // added on the activity's filter page.
              removed: [], // members' filters removed on the activity's filter page.
              list: [], // list of all the active filters (members' filters + added filters - removed filters).
            },
          },
        ],
        options: {
          lightsOn: true,
        },
      },
    ],
    // Dersom vi skal bruke Vue så er dette unødvendig da Router løser dette for oss.
    pages: [
      {
        name: "login",
        requiresAuth: false,
      },
      {
        name: "register",
        requiresAuth: false,
      },
      {
        name: "home",
        requiresAuth: true,
      },
      // osv...
    ],

    filters: [
      {
        name: 'Barn',
        overlap: [
          ['1',1],
          ['2',1],
          ['3',1],
          ['4',1],
          ['5',1],
          ['6-7',1],
          ['8-10',0.8],
          ['11-20',0.1],
        ]
      },




      {
        name: "over 100kr",
        activities: [
          {
            name: "Restaurant",
            match: 100,
          },
          {
            name: "Kebabsjappe",
            match: 50,
          },
        ],
      },
      {
        name: "under 100kr",
        activities: [
          {
            name: "Restaurant",
            match: -100,
          },
          {
            name: "Kebabsjappe",
            match: 100,
          },
        ],
      },
      {
        name: "vil spise",
        activities: [
          {
            name: "Restaurant",
            match: 100,
          },
          {
            name: "Kebabsjappe",
            match: 100,
          },
        ],
      },
    ],
  },
};




export { aktivo }