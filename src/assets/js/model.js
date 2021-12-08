const aktivo = {
  // App
  app: {
    history: [],
    currentPage: "",
    currentUser: "demo",
    user: {},
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
      filters: [],
    },

    activityFilters: {
      returnPage: "",
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
        name: "Lage mat i naturen",
        description:
          "Med litt planlegging, tålmodighet og engasjement for å prøve ut noe nytt, er veien kort til et vellykket friluftsmåltid.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Liker fysisk aktivitet", 0],
          ["God fysisk helse", 0],
          ["Liker å gå tur", 0],
          ["Liker å være ute på vinteren", 0],
          ["Liker å være ute på sommeren", 0],
          ["Liker å være ute", 0],
        ],
        exfilters: [
          ["Misliker å være ute på vinteren", 0],
          ["Misliker å være ute på sommeren", 0],
          ["Misliker å være ute", 0],
        ],
      },
      {
        name: "Dra på fisketur",
        description:
          "Bor du ved havet kan du fiske gratis året rundt..",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Liker fysisk aktivitet", 0],
          ["God fysisk helse", 0],
          ["Liker å gå tur", 0],
          ["Liker å være ute på vinteren", 0],
          ["Liker å være ute på sommeren", 0],
          ["Liker å være ute", 0],
          ["Har dårlig råd", 0],
        ],
        exfilters: [
          ["Misliker å være ute på vinteren", 0],
          ["Misliker å være ute på sommeren", 0],
          ["Misliker å være ute", 0],
        ],
      },
      {
        name: "Turorientering",
        description:
          "Å være på tur blir plutselig mye morsommere når man kan lete etter poster samtidig.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Liker fysisk aktivitet", 30],
          ["God fysisk helse", 0],
          ["Liker å gå tur", 0],
          ["Liker å være ute på vinteren", 0],
          ["Liker å være ute", 0],
          ["Har dårlig råd", 0],
        ],
        exfilters: [
          ["Misliker å være ute på vinteren", 0],
          ["Misliker å være ute på sommeren", 0],
          ["Misliker å være ute", 0],
        ],
      },
      {
        name: "Bingo",
        description:
          "Bingo er et sjansespill der tilfeldige sifre trekkes, og spillerne deretter markerer de aktuelle sifrene på ferdigtrykkede ruteskjemaer med tall inni. Her er det gjerne fine premier og servering av noe søtt.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Liker kort- og brettspill", 0],
          ["Liker hjernetrim", 0],
        ],
        exfilters: [
          ["Liker å være ute", 0],
          ["Liker fysisk aktivitet", 0],
          ["Liker å gå tur", 0],
        ],
      },
      {
        name: "Bowling",
        description:
          "Bowling er en kjent og kjær sport som passer de aller fleste (ikke bare Columbine).",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["Liker fysisk aktivitet", 0],
          ["God fysisk helse", 0],
          ["Har god råd", 0],
          ["Misliker å være ute", 0],
          ["Misliker å være ute på sommeren", 0],
          ["Misliker å være ute på vinteren", 0],
        ],
        exfilters: [
          ["Veldig bevegelseshemmet", 0],
          ["Dårlig fysisk helse", 0],
        ],
      },
      {
        name: "Snøballkasting",
        description: "Overrask tilfeldig forbipasserende med surprise snow in face experience 3000!",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["4-6år", 0],
          ["7-12år", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["Liker fysisk aktivitet", 0],
          ["God fysisk helse", 0],
          ["Har dårlig råd", 0],
          ["Liker å være ute", 0],
          ["Liker å være ute på vinteren", 0],
        ],
        exfilters: [
          ["Misliker å være ute på vinteren", 0],
          ["Misliker å være ute på sommeren", 0],
          ["Misliker å være ute", 0],
          ["Veldig bevegelseshemmet", 0],
          ["Dårlig fysisk helse", 0],
        ],
      },
      {
        name: "Paintball",
        description: "Mal ungene dine. Family fun!",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["Liker fysisk aktivitet", 0],
          ["God fysisk helse", 0],
          ["Har god råd", 0],
          ["Liker å være ute", 0],
          ["Liker å være ute på vinteren", 0],
          ["Liker å være ute på sommeren", 0],
        ],
        exfilters: [
          ["Misliker å være ute på vinteren", 0],
          ["Misliker å være ute på sommeren", 0],
          ["Misliker å være ute", 0],
          ["Veldig bevegelseshemmet", 0],
          ["Dårlig fysisk helse", 0],
        ],
      },
      {
        name: "Curling",
        description:
          "Et sosialt lagspill på is. Dra med typen og la han sveipe gulvet for en gangs skyld!",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["Liker fysisk aktivitet", 0],
          ["God fysisk helse", 0],
        ],
        exfilters: [
          ["Veldig bevegelseshemmet", 0],
          ["Dårlig fysisk helse", 0],
        ],
      },
      {
        name: "Sjakk",
        description: "Hvis du heter Bjørn eller Tarjay",
        filters: [
          ["2", 0],
          ["7-12år", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Liker hjernetrim", 0],
          ["Liker kort- og brettspill", 0],
        ],
        exfilters: [
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Brettspill",
        description: "F.eks monopol",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["7-12år", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Liker hjernetrim", 0],
          ["Liker kort- og brettspill", 0],
          ["Veldig bevegelseshemmet", 0],
          ["Dårlig fysisk helse", 0],
        ],
        exfilters: [
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Kortspill",
        description: "F.eks poker, amerikaner, osv.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["7-12år", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Liker hjernetrim", 0],
          ["Liker kort- og brettspill", 0],
          ["Veldig bevegelseshemmet", 0],
          ["Dårlig fysisk helse", 0],
        ],
        exfilters: [
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Dataklubb",
        description: "For nerds.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["7-12år", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["Liker hjernetrim", 0],
          ["Liker gaming", 0],
          ["Misliker kort- og brettspill", 0],
          ["Vil være inne", 0],
          ["God på data og teknologi", 0],
          ["Veldig bevegelseshemmet", 0],
          ["Dårlig fysisk helse", 0],
        ],
        exfilters: [
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Dans",
        description: "Dance dance baby.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["Liker fysisk aktivitet", 0],
          ["God fysisk helse", 0],
          ["Liker å delta i sport", 0],
          ["Liker dans", 0],
        ],
        exfilters: [
          ["Veldig bevegelseshemmet", 0],
          ["Dårlig fysisk helse", 0],
        ],
      },
      {
        name: "Kino",
        description: "Hva skal man si om det egentlig.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["7-12år", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["Liker film", 0],
        ],
        exfilters: [
          ["Misliker film", 0],
          ["Liker å være ute", 0],
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Karaoke",
        description: "Det alle de kule kidsa gjør i asia",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["Drikker alkohol", 0],
          ["Utadvendt", 0],
        ],
        exfilters: [
          ["Innadvendt", 0],
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Frokostgruppe",
        description: "For de som spiser frokost.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Utadvendt", 0],
          ["Vil være inne", 0],
        ],
        exfilters: [
          ["Innadvendt", 0],
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Herrecafé og herregruppe",
        description: "Aktiviteten sier det meste..",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Utadvendt", 0],
          ["Vil være inne", 0],
          ["Kun menn", 0],
        ],
        exfilters: [
          ["Innadvendt", 0],
          ["Kun kvinner", 0],
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Strikking",
        description: "For chicks (?)",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Kun kvinner", 0],
          ["Liker å være inne", 0],
        ],
        exfilters: [
          ["Innadvendt", 0],
          ["Kun menn", 0],
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Lesegruppe",
        description: "For nerds.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["7-12år", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["Liker bøker", 0],
        ],
        exfilters: [
          ["Innadvendt", 0],
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Tegne",
        description: "",
        filters: [
          ["1", 0],
          ["7-12år", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
        ],
        exfilters: [
          ["Like å være ute", 0],
          ["Liker fysisk aktivitet", 0],
        ],
      },
      {
        name: "Quiz",
        description: "",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Liker kort- og brettspill", 0],
          ["Liker hjernetrim", 0],
        ],
        exfilters: [
          ["Liker fysisk aktivitet", 0],
          ["Liker å være ute", 0],
        ],
      },
      {
        name: "Kryssord",
        description: "",
        filters: [
          ["1", 0],
          ["13-15år", 0],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Liker kort- og brettspill", 0],
          ["Liker hjernetrim", 0],
        ],
        exfilters: [
          ["Misliker bøker", 0],
          ["Liker fysisk aktivitet", 0],
          ["Liker å være ute", 0],
        ],
      },
      {
        name: "Trening",
        description: "",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["16-17år", 0],
          ["18-19år", 0],
          ["20-29år", 0],
          ["30-49år", 0],
          ["50-69år", 0],
          ["70+år", 0],
          ["Liker fysisk aktivitet", 0],
          ["Liker å være ute", 0],
          ["God fysisk helse", 0],
          ["Liker å gå tur", 0],
        ],
        exfilters: [
          ["Veldig bevegelseshemmet", 0],
          ["Dårlig fysisk helse", 0],
          ["Misliker å være ute", 0],
        ],
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
          lightsOn: false,
        },
      },
    ],
    allUsers: [],
    // TODO: Add all pages to the array or rewrite method to only check for some kind of value that non auth pages requires
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
    ],

    filters: [
      {
        name: '0-3år',
        agegroup: true,
        overlap: [
          ['4-6år', .6]
        ]
      },
      {
        name: '4-6år',
        agegroup: true,
        overlap: [
          ['0-3år', .6],
          ['7-12år', .7]
        ]
      },
      {
        name: '7-12år',
        agegroup: true,
        overlap: [
          ['4-6år', .7],
          ['13-15år', .7]
        ]
      },
      {
        name: '13-15år',
        agegroup: true,
        overlap: [
          ['7-12år', .7],
          ['16-17år', .85]
        ]
      },
      {
        name: '16-17år',
        agegroup: true,
        overlap: [
          ['13-15år', .85],
          ['18-19år', .9]
        ]
      },
      {
        name: '18-19år',
        agegroup: true,
        overlap: [
          ['16-17år', .9],
          ['20-29år', .8]
        ]
      },
      {
        name: '20-29år',
        agegroup: true,
        overlap: [
          ['18-19år', .8],
          ['30-49år', .8]
        ]
      },
      {
        name: '30-49år',
        agegroup: true,
        overlap: [
          ['20-29år', .8],
          ['50-69år', .8]
        ]
      },
      {
        name: '50-69år',
        agegroup: true,
        overlap: [
          ['30-49år', .8],
          ['70+år', .8]
        ]
      },
      {
        name: '70+år',
        agegroup: true,
        overlap: [
          ['50-69år', .8]
        ]
      },
      {
        name: 'Bare menn',
        onlygender: true,
        overlap: [
        ]
      },
      {
        name: 'Bare kvinner',
        onlygender: true,
        overlap: [
        ]
      },
      {
        name: 'Mann',
        gender: true,
        overlap: [
        ]
      },
      {
        name: 'Kvinne',
        gender: true,
        overlap: [
        ]
      },
      {
        name: '1',
        count: true,
        overlap: [
          ['2', 1],
          ['3', 0.5],
          ['4', 1],
          ['5', 1],
          ['6-7', 1],
          ['8-10', 0.8],
          ['11-20', 0.1],
        ]
      },
      {
        name: '2',
        count: true,
        overlap: [
          ['1', 1],
          ['3', 0.5],
          ['4', 1],
          ['5', 1],
          ['6-7', 1],
          ['8-10', 0.8],
          ['11-20', 0.1],
        ]
      },
      {
        name: '3',
        count: true,
        overlap: [
          ['1', 1],
          ['2', 0.5],
          ['4', 1],
          ['5', 1],
          ['6-7', 1],
          ['8-10', 0.8],
          ['11-20', 0.1],
        ]
      },
      {
        name: '4-5',
        count: true,
        overlap: [
          ['1', 1],
          ['2', 0.5],
          ['4', 1],
          ['5', 1],
          ['6-7', 1],
          ['8-10', 0.8],
          ['11-20', 0.1],
        ]
      },
      {
        name: '6+',
        count: true,
        overlap: [
          ['1', 1],
          ['2', 0.5],
          ['4', 1],
          ['5', 1],
          ['6-7', 1],
          ['8-10', 0.8],
          ['11-20', 0.1],
        ]
      },
      {
        name: 'Singel',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'I forhold',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Utadvendt', // (foretrekker kanskje utesteder over film/gaming)
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Innadvendt', // (foretrekker kanskje film/gaming over utesteder)
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Drikker alkohol',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Drikker ikke alkohol',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Har god råd',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Har dårlig råd',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker fysisk aktivitet',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker fysisk aktivitet',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'God fysisk helse',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Dårlig fysisk helse',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Veldig bevegelseshemmet',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Mange mat-allergier',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker å være ute',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker å være ute',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker å være inne',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker å være inne',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker å være ute på sommeren',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker å være ute på sommeren',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker å være ute på vinteren',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker å være ute på vinteren',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker å gå tur',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker å gå tur',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker å se sport',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker å se sport',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker å delta i sport',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker å delta i sport',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker gaming',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker gaming',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker bøker',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker bøker',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker film',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker film',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker kino',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker kino',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker bowling',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker bowling',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker museum',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker museum',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker kunst',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker kunst',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker kort- og brettspill',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker kort- og brettspill',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'God på data og teknologi',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Dårlig på data og teknologi',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker shopping',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker shopping',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker ski',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker ski',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker dans',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker dans',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker musikk',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker musikk',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Soss', // (f.eks kler seg fancy, spiser på dyre steder, tar taxi osv)
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Anti-soss', // (vanlige klær, spiser på billige steder, tar kun kollektiv transport)
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Liker hjernetrim', // (f.eks sjakk, sudoku, quiz(litt mindre relevant if alone))
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Misliker hjernetrim',
        person: true,
        overlap: [
        ]
      },
      {
        name: 'Sommer',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Vinter',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Kan ikke reise til strand',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Kan ikke reise til skog',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Kan ikke reise til fjell',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Kan ikke reise til by',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Vil være inne',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Vil være ute',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Vil spise',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Vil være fysisk aktiv',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Vil spare penger',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Maks 1 time',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Maks 2 timer',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Maks 3 timer',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Maks 4 timer',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Maks 5 timer',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Minst 1 time',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Minst 2 timer',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Minst 3 timer',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Minst 4 timer',
        activity: true,
        overlap: [
        ]
      },
      {
        name: 'Minst 5 timer',
        activity: true,
        overlap: [
        ]
      },
      // (automatisk lagt til: bare menn eller bare kvinner, aldersgrupper, og antall personer)
    ],
  },
};




export { aktivo }