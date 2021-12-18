const aktivo = {
  // App
  app: {
    history: [],
    currentPage: "",
    currentUser: "demo1",
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
          ["1", 5],
          ["2", 10],
          ["3", 15],
          ["4-5", 20],
          ["6+", 20],
          ["7-12år", 5],
          ["13-15år", 8],
          ["16-17år", 10],
          ["18-19år", 10],
          ["20-29år", 20],
          ["30-49år", 20],
          ["50-69år", 10],
          ["70+år", 5],
          ["Liker fysisk aktivitet", 10],
          ["God fysisk helse", 20],
          ["Liker å gå tur", 20],
          ["Liker å være ute på vinteren", 20],
          ["Liker å være ute på sommeren", 20],
          ["Liker å være ute", 30],
          ["Mange mat-allergier", -10],
          ["Misliker å være ute", -20],
          ["Veldig bevegelseshemmet", -10],
        ],
        exfilters: [
        ],
      },
      {
        name: "Dra på fisketur",
        description:
          "Bor du ved havet kan du fiske gratis året rundt..",
        filters: [
          ["1", 10],
          ["2", 20],
          ["3", 10],
          ["4-5", 10],
          ["6+", 0],
          ["13-15år", 8],
          ["16-17år", 15],
          ["18-19år", 20],
          ["20-29år", 20],
          ["30-49år", 20],
          ["50-69år", 20],
          ["70+år", 10],
          ["Liker fysisk aktivitet", 12],
          ["God fysisk helse", 10],
          ["Liker å gå tur", 0],
          ["Liker å være ute på sommeren", 20],
          ["Liker å være ute", 20],
          ["Misliker å være ute", -20],
          ["Veldig bevegelseshemmet", -30],
        ],
        exfilters: [
        ],
      },
      {
        name: "Turorientering",
        description:
          "Å være på tur blir plutselig mye morsommere når man kan lete etter poster samtidig.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 20],
          ["4-5", 25],
          ["6+", 25],
          ["13-15år", 8],
          ["16-17år", 12],
          ["18-19år", 15],
          ["20-29år", 20],
          ["30-49år", 20],
          ["50-69år", 10],
          ["70+år", 5],
          ["Liker fysisk aktivitet", 20],
          ["God fysisk helse", 20],
          ["Liker å gå tur", 20],
          ["Liker å være ute på vinteren", 20],
          ["Liker å være ute på sommeren", 20],
          ["Liker å være ute", 20],
        ],
        exfilters: [
          "Veldig bevegelseshemmet",
        ],
      },
      {
        name: "Bingo",
        description:
          "Bingo er et sjansespill der tilfeldige sifre trekkes, og spillerne deretter markerer de aktuelle sifrene på ferdigtrykkede ruteskjemaer med tall inni. Her er det gjerne fine premier og servering av noe søtt.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 20],
          ["4-5", 20],
          ["6+", 10],
          ["18-19år", 5],
          ["20-29år", 5],
          ["30-49år", 5],
          ["50-69år", 10],
          ["70+år", 15],
          ["Liker hjernetrim", 5],
        ],
        exfilters: [
        ],
      },
      {
        name: "Bowling",
        description:
          "Bowling er en kjent og kjær sport som passer de aller fleste (ikke bare Columbine).",
        filters: [
          ["2", 10],
          ["3", 20],
          ["4-5", 25],
          ["6+", 25],
          ["13-15år", 20],
          ["16-17år", 20],
          ["18-19år", 25],
          ["20-29år", 30],
          ["30-49år", 30],
          ["50-69år", 20],
          ["70+år", 12],
          ["Liker fysisk aktivitet", 15],
          ["God fysisk helse", 20],
          ["Misliker å være ute", -5],
          ["Liker å være inne", 10],
        ],
        exfilters: [
          "Veldig bevegelseshemmet",
        ],
      },
      {
        name: "Snøballkasting",
        description: "Overrask tilfeldig forbipasserende med surprise snow in face experience 3000!",
        filters: [
          ["2", 10],
          ["3", 20],
          ["4-5", 20],
          ["6+", 20],
          ["4-6år", 5],
          ["7-12år", 25],
          ["13-15år", 30],
          ["16-17år", 15],
          ["18-19år", 8],
          ["20-29år", 5],
          ["Liker fysisk aktivitet", 20],
          ["God fysisk helse", 20],
          ["Liker å være ute", 20],
          ["Liker å være ute på vinteren", 30],
          ["Dårlig fysisk helse", -20],
        ],
        exfilters: [
          "Veldig bevegelseshemmet",
        ],
      },
      {
        name: "Paintball",
        description: "Mal ungene dine. Family fun!",
        filters: [
          ["2", 5],
          ["3", 20],
          ["4-5", 25],
          ["6+", 30],
          ["18-19år", 20],
          ["20-29år", 20],
          ["30-49år", 15],
          ["Liker fysisk aktivitet", 20],
          ["God fysisk helse", 20],
          ["Liker å være ute", 20],
        ],
        exfilters: [
          "Veldig bevegelseshemmet",
        ],
      },
      {
        name: "Curling",
        description:
          "Et sosialt lagspill på is. Dra med typen og la han sveipe gulvet for en gangs skyld!",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 10],
          ["4-5", 20],
          ["6+", 20],
          ["16-17år", 10],
          ["18-19år", 20],
          ["20-29år", 20],
          ["30-49år", 20],
          ["50-69år", 10],
          ["Liker fysisk aktivitet", 20],
          ["God fysisk helse", 20],
        ],
        exfilters: [
          "Veldig bevegelseshemmet",
        ],
      },
      {
        name: "Sjakk",
        description: "Hvis du heter Bjørn eller Tarjay",
        filters: [
          ["2", 30],
          ["7-12år", 20],
          ["13-15år", 20],
          ["16-17år", 20],
          ["18-19år", 20],
          ["20-29år", 20],
          ["30-49år", 20],
          ["50-69år", 20],
          ["70+år", 20],
          ["Liker hjernetrim", 30],
          ["Liker kort- og brettspill", 30],
          ["Liker fysisk aktivitet", -5],
        ],
        exfilters: [
          "1",
        ],
      },
      {
        name: "Brettspill",
        description: "F.eks monopol",
        filters: [
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["7-12år", 20],
          ["13-15år", 20],
          ["16-17år", 20],
          ["18-19år", 20],
          ["20-29år", 20],
          ["30-49år", 20],
          ["50-69år", 20],
          ["70+år", 20],
          ["Liker hjernetrim", 30],
          ["Liker kort- og brettspill", 30],
        ],
        exfilters: [
          "1",
        ],
      },
      {
        name: "Kortspill",
        description: "F.eks poker, amerikaner, osv.",
        filters: [
          ["1", 10],
          ["2", 15],
          ["3", 20],
          ["4-5", 30],
          ["6+", 20],
          ["7-12år", 20],
          ["13-15år", 20],
          ["16-17år", 20],
          ["18-19år", 20],
          ["20-29år", 20],
          ["30-49år", 20],
          ["50-69år", 20],
          ["70+år", 20],
          ["Liker hjernetrim", 20],
          ["Liker kort- og brettspill", 10],
          ["Veldig bevegelseshemmet", 10],
        ],
        exfilters: [

        ],
      },
      {
        name: "Dataklubb",
        description: "Er du datainteressert og ønsker å være med andre som har den samme interessen? Da kan en dataklubb være perfekt for deg/dere.",
        filters: [
          ["1", 15],
          ["2", 10],
          ["3", 10],
          ["4-5", 10],
          ["6+", 10],
          ["7-12år", 20],
          ["13-15år", 20],
          ["16-17år", 20],
          ["18-19år", 20],
          ["20-29år", 20],
          ["30-49år", 20],
          ["50-69år", 20],
          ["70+år", 10],
          ["Liker hjernetrim", 10],
          ["Liker gaming", 30],
          ["Misliker kort- og brettspill", 20],
          ["Vil være inne", 20],
          ["God på data og teknologi", 0],
          ["Veldig bevegelseshemmet", 10],
        ],
        exfilters: [

        ],
      },
      {
        name: "Dans",
        description: "Kan gjøres med og uten musikk! Perfekt for deg/dere som liker å uttrykke deg med rytmiske kroppsbevegelser.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 0],
          ["6+", 0],
          ["16-17år", 0],
          ["18-19år", 5],
          ["20-29år", 10],
          ["30-49år", 20],
          ["Liker fysisk aktivitet", 10],
          ["God fysisk helse", 10],
          ["Liker å delta i sport", 10],
          ["Liker dans", 30],
        ],
        exfilters: [
          "Veldig bevegelseshemmet",
        ],
      },
      {
        name: "Kino",
        description: "Lyst til å se en film med god, stor skjerm og surround annlegg? Dra på kino! Den perfekte aktivitet både alene og med andre.",
        filters: [
          ["1", 0],
          ["2", 10],
          ["3", 30],
          ["4-5", 20],
          ["6+", 15],
          ["7-12år", 5],
          ["13-15år", 10],
          ["16-17år", 15],
          ["18-19år", 20],
          ["20-29år", 30],
          ["30-49år", 15],
          ["50-69år", 10],
          ["Liker film", 30],
        ],
        exfilters: [


        ],
      },
      {
        name: "Karaoke",
        description: "Det alle de kule kidsa gjør i asia.",
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

        ],
      },
      {
        name: "Frokostgruppe",
        description: 'Ta del i en frokostgruppe om du er en av de som nyter "dagens viktigste måltid".',
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

        ],
      },
      {
        name: "Herrecafé og herregruppe",
        description: "Dra på herregruppe og herrecafé - der menn fra mange ulike land møtes til en hyggelig prat og en kopp kaffe.",
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

          "Kun kvinner",

        ],
      },
      {
        name: "Strikking",
        description: "Strikking er en teknikk for å fremstille tekstiler av garn. Dette er mest sannynslig noe du allerede kjenner til og burde være enkelt å komme i gang med.",
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

          "Kun menn",

        ],
      },
      {
        name: "Lesegruppe",
        description: "De fleste byer har en lesegruppe. Finn en lesegruppe i ditt nærområde og dra frem din indre bokorm.",
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

        ],
      },
      {
        name: "Tegne",
        description: "Dra frem farger og ark - bruk kreativiteten og tegn hva du vil!",
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

        ],
      },
      {
        name: "Quiz",
        description: "En quiz er så mangt, og kan utføres alene eller i gode venners lag.",
        filters: [
          ["1", 2],
          ["2", 5],
          ["3", 25],
          ["4-5", 30],
          ["6+", 30],
          ["13-15år", 5],
          ["16-17år", 10],
          ["18-19år", 10],
          ["20-29år", 20],
          ["30-49år", 2],
          ["50-69år", 25],
          ["70+år", 25],
          ["Liker kort- og brettspill", 10],
          ["Liker hjernetrim", 15],
          ["Misliker hjernetrim", -15],
          ["Misliker å være inne", -10],
        ],
        exfilters: [
        ],
      },
      {
        name: "Kryssord",
        description: "Kryssord er den mest vanlige formen for ordpuslespill. Finnes gjerne i en avis, kryssordbok eller på internett.",
        filters: [
          ["1", 25],
          ["13-15år", 5],
          ["16-17år", 10],
          ["18-19år", 18],
          ["20-29år", 25],
          ["30-49år", 25],
          ["50-69år", 25],
          ["70+år", 15],
          ["Liker kort- og brettspill", 5],
          ["Liker hjernetrim", 15],
          ["Liker bøker", 10],
          ["Misliker hjernetrim", -15],
        ],
        exfilters: [
        ],
      },
      {
        name: "Trening",
        description: "Hold formen inntakt og få i gang hjertepumpa et par hakk! Du kan for eksempel trene hjemme i stua eller på et treningsstudio.",
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
          ["Dårlig fysisk helse", 10],
        ],
        exfilters: [
          "Veldig bevegelseshemmet",
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
        opposite: 'I forhold',
        overlap: [
        ]
      },
      {
        name: 'I forhold',
        person: true,
        opposite: 'Singel',
        overlap: [
        ]
      },
      {
        name: 'Utadvendt', // (foretrekker kanskje utesteder over film/gaming)
        person: true,
        opposite: 'Innadvendt',
        overlap: [
        ]
      },
      {
        name: 'Innadvendt', // (foretrekker kanskje film/gaming over utesteder)
        person: true,
        opposite: 'Utadvendt',
        overlap: [
        ]
      },
      {
        name: 'Drikker alkohol',
        person: true,
        opposite: 'Drikker ikke alkohol',
        overlap: [
        ]
      },
      {
        name: 'Drikker ikke alkohol',
        person: true,
        opposite: 'Drikker alkohol',
        overlap: [
        ]
      },
      {
        name: 'Har god råd',
        person: true,
        opposite: 'Har dårlig råd',
        overlap: [
        ]
      },
      {
        name: 'Har dårlig råd',
        person: true,
        opposite: 'Har god råd',
        overlap: [
        ]
      },
      {
        name: 'Liker fysisk aktivitet',
        person: true,
        opposite: 'Misliker fysisk aktivitet',
        overlap: [
        ]
      },
      {
        name: 'Misliker fysisk aktivitet',
        person: true,
        opposite: 'Liker fysisk aktivitet',
        overlap: [
        ]
      },
      {
        name: 'God fysisk helse',
        person: true,
        opposite: 'Dårlig fysisk helse',
        overlap: [
        ]
      },
      {
        name: 'Dårlig fysisk helse',
        person: true,
        opposite: 'God fysisk helse',
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
        opposite: 'Misliker å være ute',
        overlap: [
          
        ]
      },
      {
        name: 'Misliker å være ute',
        person: true,
        opposite: 'Liker å være ute',
        overlap: [
          
        ]
      },
      {
        name: 'Liker å være inne',
        person: true,
        opposite: 'Misliker å være inne',
        overlap: [
          
        ]
      },
      {
        name: 'Misliker å være inne',
        person: true,
        opposite: 'Liker å være inne',
        overlap: [
          
        ]
      },
      {
        name: 'Liker å være ute på sommeren',
        person: true,
        opposite: 'Misliker å være ute på sommeren',
        overlap: [
          
        ]
      },
      {
        name: 'Misliker å være ute på sommeren',
        person: true,
        opposite: 'Liker å være ute på sommeren',
        overlap: [
          
        ]
      },
      {
        name: 'Liker å være ute på vinteren',
        person: true,
        opposite: 'Misliker å være ute på vinteren',
        overlap: [
          
        ]
      },
      {
        name: 'Misliker å være ute på vinteren',
        person: true,
        opposite: 'Liker å være ute på vinteren',
        overlap: [
          
        ]
      },
      {
        name: 'Liker å gå tur',
        person: true,
        opposite: 'Misliker å gå tur',
        overlap: [
          
        ]
      },
      {
        name: 'Misliker å gå tur',
        person: true,
        opposite: 'Liker å gå tur',
        overlap: [
          
        ]
      },
      {
        name: 'Liker å se sport',
        person: true,
        opposite: 'Misliker å se sport',
        overlap: [
        ]
      },
      {
        name: 'Misliker å se sport',
        person: true,
        opposite: 'Liker å se sport',
        overlap: [
        ]
      },
      {
        name: 'Liker å delta i sport',
        person: true,
        opposite: 'Misliker å delta i sport',
        overlap: [
        ]
      },
      {
        name: 'Misliker å delta i sport',
        person: true,
        opposite: 'Liker å delta i sport',
        overlap: [
        ]
      },
      {
        name: 'Liker gaming',
        person: true,
        opposite: 'Misliker gaming',
        overlap: [
        ]
      },
      {
        name: 'Misliker gaming',
        person: true,
        opposite: 'Liker gaming',
        overlap: [
        ]
      },
      {
        name: 'Liker bøker',
        person: true,
        opposite: 'Misliker bøker',
        overlap: [
        ]
      },
      {
        name: 'Misliker bøker',
        person: true,
        opposite: 'Liker bøker',
        overlap: [
        ]
      },
      {
        name: 'Liker film',
        person: true,
        opposite: 'Misliker film',
        overlap: [
        ]
      },
      {
        name: 'Misliker film',
        person: true,
        opposite: 'Liker film',
        overlap: [
        ]
      },
      {
        name: 'Liker kino',
        person: true,
        opposite: 'Misliker kino',
        overlap: [
        ]
      },
      {
        name: 'Misliker kino',
        person: true,
        opposite: 'Liker kino',
        overlap: [
        ]
      },
      {
        name: 'Liker bowling',
        person: true,
        opposite: 'Misliker bowling',
        overlap: [
        ]
      },
      {
        name: 'Misliker bowling',
        person: true,
        opposite: 'Liker bowling',
        overlap: [
        ]
      },
      {
        name: 'Liker museum',
        person: true,
        opposite: 'Misliker museum',
        overlap: [
        ]
      },
      {
        name: 'Misliker museum',
        person: true,
        opposite: 'Liker museum',
        overlap: [
        ]
      },
      {
        name: 'Liker kunst',
        person: true,
        opposite: 'Misliker kunst',
        overlap: [
        ]
      },
      {
        name: 'Misliker kunst',
        person: true,
        opposite: 'Liker kunst',
        overlap: [
        ]
      },
      {
        name: 'Liker kort- og brettspill',
        person: true,
        opposite: 'Misliker kort- og brettspill',
        overlap: [
        ]
      },
      {
        name: 'Misliker kort- og brettspill',
        person: true,
        opposite: 'Liker kort- og brettspill',
        overlap: [
        ]
      },
      {
        name: 'God på data og teknologi',
        person: true,
        opposite: 'Dårlig på data og teknologi',
        overlap: [
        ]
      },
      {
        name: 'Dårlig på data og teknologi',
        person: true,
        opposite: 'God på data og teknologi',
        overlap: [
        ]
      },
      {
        name: 'Liker shopping',
        person: true,
        opposite: 'Misliker shopping',
        overlap: [
        ]
      },
      {
        name: 'Misliker shopping',
        person: true,
        opposite: 'Liker shopping',
        overlap: [
        ]
      },
      {
        name: 'Liker ski',
        person: true,
        opposite: 'Misliker ski',
        overlap: [
        ]
      },
      {
        name: 'Misliker ski',
        person: true,
        opposite: 'Liker ski',
        overlap: [
        ]
      },
      {
        name: 'Liker dans',
        person: true,
        opposite: 'Misliker dans',
        overlap: [
        ]
      },
      {
        name: 'Misliker dans',
        person: true,
        opposite: 'Liker dans',
        overlap: [
        ]
      },
      {
        name: 'Liker musikk',
        person: true,
        opposite: 'Misliker musikk',
        overlap: [
        ]
      },
      {
        name: 'Misliker musikk',
        person: true,
        opposite: 'Liker musikk',
        overlap: [
        ]
      },
      {
        name: 'Soss', // (f.eks kler seg fancy, spiser på dyre steder, tar taxi osv)
        person: true,
        opposite: 'Anti-soss',
        overlap: [
        ]
      },
      {
        name: 'Anti-soss', // (vanlige klær, spiser på billige steder, tar kun kollektiv transport)
        person: true,
        opposite: 'Soss',
        overlap: [
        ]
      },
      {
        name: 'Liker hjernetrim', // (f.eks sjakk, sudoku, quiz(litt mindre relevant if alone))
        person: true,
        opposite: 'Misliker hjernetrim',
        overlap: [
        ]
      },
      {
        name: 'Misliker hjernetrim',
        person: true,
        opposite: 'Liker hjernetrim',
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