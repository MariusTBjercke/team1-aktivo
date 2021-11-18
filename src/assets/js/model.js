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
      newGroup: {
        name: "",
        search: "",
        people: [],
        returnPage: "",
      },
      newPerson: {
        name: "",
        search: "",
        gender: "",
        born: null,
        filters: [],
        returnPage: "",
      },
      administerPerson: {
        search: "",
      },
      administerGroup: {
        search: "",
      },
      newActivity: {
        groupSearch: "",
        peopleSearch: "",
        chosenGroup: [],
        chosenPeople: [],
        filter: {
          people: [],
          activity: [],
        },
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
          name: "",
          description: "",
          travelOptions: [],
          travelCost: "",
          activityCost: "",
          travelTime: "",
          activityTime: ""
        },
      ],
      users: [
        {
          username: "demo",
          password: "demo",
          email: "",
          fullName: "",
          people: [
            {
              name: "", // unique name (functions as id)
              born: null,
              filter: [],
            },
          ],
          groups: [
            {
              name: "", // unique name (functions as id)
              members: ["name1", "name2", "name3"], // names function as ids...
              // do we want to add a group specific filter? if so; add an "added" filter and a "removed" filter (same as archive.filters).
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
            theme: 0, // 0 for light, 1 for dark?
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
          name: "over 100kr",
          activities: [
              {
                  name: 'Restaurant',
                  match: 100
              },
              {
                  name: 'Kebabsjappe',
                  match: 50
              }
          ]
        },
        {
          name: "under 100kr",
          activities: [
              {
                  name: 'Restaurant',
                  match: -100
              },
              {
                  name: 'Kebabsjappe',
                  match: 100
              }
          ]
        },
        {
          name: "vil spise",
          activities: [
            {
                name: 'Restaurant',
                match: 100
            },
            {
                name: 'Kebabsjappe',
                match: 100
            }
        ]
        }
      ],
    },
  };
  
  export { aktivo }