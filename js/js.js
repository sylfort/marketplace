var App = {
  init: function () {
    console.log("Inicio do App");

    console.log("init:", this);

    this.elements.createApp();
    this.events.title();
    this.events.searchBar();
    this.events.addMyCards();
    this.elements.createCardsContainer();
    this.controllers.renderAllCards();

    console.log("Fim do App");
  },

  events: {
    searchBar: function () {
      App.elements.searchBar.onkeyup = function (e) {
        if (e.key === "Enter") {
          App.controllers.renderAllCards();
          return;
        }

        App.store.state.search = e.target.value.toLowerCase();
        // console.log(e);
      };
    },
    title: function () {
      // App.elements.title.onclick = App.controllers.home;
      console.log();

      App.elements.title.onclick = function () {
        App.controllers.home();
      };
    },

    addMyCards: function () {
      App.elements.buyBtn.onclick = function (myCards, card) {
        App.store.state.myCards = App.elements.card;
        console.log(App.store.state.myCards);
      };
    },
  },

  controllers: {
    home: function () {
      App.store.state.search = "";
      this.renderAllCards();

      // acessa o searchBar e limpa o value = ""
    },

    filterCards: function () {
      // Usa lista de todos os cards
      var cards = App.store.state.cards;

      // Se o page == my, usa a lista myCards
      if (App.store.state.page == "my") {
        cards = App.store.state.myCards;
      }

      // se nao tiver pesquisa, retorna todos cards
      if (!App.store.state.search) {
        return cards;
      }

      var searchResult = cards.filter(function (card) {
        // transforma o nome do card pra minusculo e faz uma pesquisa pra ver se o nome existe
        var isMatch =
          card.name.toLowerCase().search(App.store.state.search) > -1;

        console.log(isMatch, card.name.toLowerCase(), App.store.state.search);

        return isMatch;
      });
      console.log("vamos filtrar", searchResult);

      return searchResult;
    },

    clearTheClutter() {
      // Pega as chaves (codes) dos cards e criar um array
      var cardCodes = Object.keys(App.elements.cards);

      // Fazer um loop nos codes
      for (var i = 0; i < cardCodes.length; i++) {
        var code = cardCodes[i];

        // Pegar o elemento pelo code e remove o elemento da pagina
        App.elements.cards[code].remove();
      }

      // limpa o obj
      App.elements.cards = {};
    },
    renderAllCards: function () {
      var cards = this.filterCards();
      console.log("Iniciar e renderizar cards", cards);

      this.clearTheClutter();

      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        this.renderCard(card);
      }
    },

    renderCard: function (card) {
      // aqui esta seu el, foi declarado e criado aqui
      var el = document.createElement("div");
      el.style.display = "flex";
      // el.style.border = "1px solid green";
      el.style.width = "250px";
      el.style.height = "300px";
      el.style.justifyContent = "center";
      el.style.alignContent = "center";
      el.style.flexWrap = "wrap";
      el.style.flexDirection = "row";
      el.style.marginBottom = "36px";
      el.style.marginTop = "3vh";

      // console.log(el);

      App.elements.cards[card.cardCode] = el;
      // console.log(card);

      // aqui voce chama a funcao de baixo apenas para renderizar a img, pois esta passando o el criado na linha 310

      this.renderImg(el, card);
      this.renderDivContainer(el, card);

      // aqui voce renderiza na tela
      App.elements.cardsContainer.appendChild(el);
    },

    renderDivContainer: function (el, card) {
      var divContainer = document.createElement("div");
      divContainer.style.textAlign = "center";
      divContainer.style.lineHeight = "0.9";
      el.appendChild(divContainer);

      this.renderName(divContainer, card);
      this.createPrice(card);
      this.renderPrice(divContainer, card);
      this.renderBuyBtn(divContainer);
    },

    renderName: function (x, card) {
      var nameCard = document.createElement("a");
      nameCard.innerHTML = card.name;
      nameCard.style.fontSize = "16px";
      nameCard.style.marginLeft = "5px";
      x.appendChild(nameCard);
    },

    renderImg: function (el, card) {
      var imageCard = document.createElement("img");
      imageCard.src = card.assets[0].gameAbsolutePath;
      imageCard.style.height = "300px";
      el.appendChild(imageCard);
    },

    createPrice: function (card) {
      var randomNum = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
      // console.log(randomNum);

      // App.store.state.cards.push("price :" + randomNum);
      card.price = randomNum;
      console.log(">>AQUI>>", card);
      // console.log(">>AQUI>>", card.price);
    },

    renderPrice: function (divContainer, card) {
      var priceCard = document.createElement("a");
      priceCard.innerHTML = "<br>Price: $" + card.price;
      priceCard.style.fontSize = "16px";
      divContainer.appendChild(priceCard);
    },

    renderBuyBtn: function (divContainer, card) {
      // <!-- Button trigger modal -->
      var buyBtn = document.createElement("button");
      buyBtn.type = "button";
      buyBtn.className = "btn btn-outline-primary btn-sm";

      buyBtn.innerHTML = "Buy";
      buyBtn.setAttribute("data-bs-toggle", "modal");
      buyBtn.setAttribute("data-bs-target", "#exampleModal");
      buyBtn.style.marginLeft = "5px";
      buyBtn.style.marginTop = "4px";

      // var customFieldValue = $("data-bs-toggle").attr("modal");
      // buyBtn.customFieldValue();
      // buyBtn.$("data-bs-target")= "#exampleModal";
      divContainer.appendChild(buyBtn);

      // <button
      //   type="button"
      //   class="btn btn-primary"
      //   data-bs-toggle="modal"
      //   data-bs-target="#exampleModal"
      // >
      //   Buy
      // </button>
    },
  },

  elements: {
    app: document.getElementById("app"),
    searchBar: document.getElementById("searchBar"),
    title: document.getElementById("title"),
    buyBtn: document.getElementById("buyBtn"),
    cardsContainer: null,
    el: null,
    cards: {},

    createApp: function () {
      console.log("iniciando a criacao de elementos");
      console.log("createApp", this);

      // this.app = document.getElementById("app");
      this.app.style.width = "100%";
      this.app.style.color = "#68482C";
      this.app.style.height = "100%";
      // this.app.style.border = "1px solid red";
      this.app.innerHTML =
        "Buy and Sell your favorite cards from Legends of Runeterra!";
      this.container = document.getElementById("bodyContainer");
      this.div = document.createElement("div");
      this.container.appendChild(this.app);

      console.log(this.app);

      console.log("elementos criados");
    },

    createCardsContainer: function () {
      this.cardsContainer = document.createElement("div");
      this.cardsContainer.style.width = "100%";
      this.cardsContainer.style.height = "100%";
      // this.cardsContainer.style.border = "1px solid blue";
      this.cardsContainer.style.display = "flex";
      this.cardsContainer.style.flexWrap = "wrap";
      this.cardsContainer.style.justifyContent = "center";
      this.cardsContainer.style.marginTop = "35px";

      this.app.appendChild(this.cardsContainer);
    },
  },
  store: {
    state: {
      search: "",
      page: "home",
      myCards: [],
      cards: [
        {
          price: 0,
          associatedCards: [],
          associatedCardRefs: ["01PZ040", "01PZ040T1"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ040T3.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ040T3-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 0,
          cost: 3,
          health: 0,
          description:
            "To play, discard 1. Deal 3 to anything.\r\nShuffle a <link=card.level1><style=AssociatedCard>Jinx</style></link> into your deck.",
          descriptionRaw:
            "To play, discard 1. Deal 3 to anything.\r\nShuffle a Jinx into your deck.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: '"FIRE IN THE CABOODLE!" - Jinx',
          artistName: "Original Force",
          name: "Jinx's Get Excited!",
          cardCode: "01PZ040T3",
          keywords: ["Fast"],
          keywordRefs: ["Fast"],
          spellSpeed: "Fast",
          spellSpeedRef: "Fast",
          rarity: "None",
          rarityRef: "None",
          subtype: "",
          subtypes: [],
          supertype: "Champion",
          type: "Spell",
          collectible: false,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01FR024", "01FR024T3"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR024T2.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR024T2-full.png",
            },
          ],
          region: "Freljord",
          regionRef: "Freljord",
          attack: 0,
          cost: 0,
          health: 0,
          description: "Deal 1 to all enemies and the enemy Nexus.",
          descriptionRaw: "Deal 1 to all enemies and the enemy Nexus.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: "The storm that comes before the calm.",
          artistName: "SIXMOREVODKA",
          name: "Glacial Storm",
          cardCode: "01FR024T2",
          keywords: ["Skill"],
          keywordRefs: ["Skill"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "None",
          rarityRef: "None",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Ability",
          collectible: false,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01PZ008", "01PZ022", "01PZ008T1"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ008T2.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ008T2-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 2,
          cost: 1,
          health: 2,
          description:
            "<link=vocab.Nexus Strike><style=Vocab>Nexus Strike</style></link>: Double the <link=card.shuffle><style=AssociatedCard>Poison Puffcaps</style></link> in the enemy deck.",
          descriptionRaw:
            "Nexus Strike: Double the Poison Puffcaps in the enemy deck.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: '"... make sure you\'re out of the blast zone!"',
          artistName: "SIXMOREVODKA",
          name: "Teemo",
          cardCode: "01PZ008T2",
          keywords: ["Elusive"],
          keywordRefs: ["Elusive"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "None",
          rarityRef: "None",
          subtype: "",
          subtypes: [],
          supertype: "Champion",
          type: "Unit",
          collectible: false,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01DE038", "01DE022T1", "01DE022T2"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE022.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE022-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 3,
          cost: 2,
          health: 2,
          description: "",
          descriptionRaw: "",
          levelupDescription:
            "I've seen 4+ allies or an allied <link=card.senna><style=AssociatedCard>Senna, Sentinel of Light</style></link> die<style=Variable></style>.",
          levelupDescriptionRaw:
            "I've seen 4+ allies or an allied Senna, Sentinel of Light die.",
          flavorText: "\"I'll be alright, Senna, long as I've got you.\"",
          artistName: "SIXMOREVODKA",
          name: "Lucian",
          cardCode: "01DE022",
          keywords: ["Quick Attack"],
          keywordRefs: ["QuickStrike"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "Champion",
          rarityRef: "Champion",
          subtype: "",
          subtypes: [],
          supertype: "Champion",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["03BW006T1"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03BW006.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03BW006-full.png",
            },
          ],
          region: "Bilgewater",
          regionRef: "Bilgewater",
          attack: 5,
          cost: 5,
          health: 6,
          description:
            "<link=vocab.RoundStart><style=Vocab>Round Start</style></link>: Create a <link=keyword.Fleeting><sprite name=Fleeting><style=Keyword>Fleeting</style></link> <link=card.create><style=AssociatedCard>Sleep with the Fishes</style></link> in hand.",
          descriptionRaw:
            "Round Start: Create a Fleeting Sleep with the Fishes in hand.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "Years in the boxing ring taught Jack valuable lessons. He learned that if his opponent can bleed, they can fear. He learned the power of a silent stare. He learned the power of uncontrolled violence.",
          artistName: "JiHun Lee",
          name: "Jack, the Winner",
          cardCode: "03BW006",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "EPIC",
          rarityRef: "Epic",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
          set: "Set3",
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03SI004.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03SI004-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 0,
          cost: 2,
          health: 0,
          description:
            "Pick a follower from the top 4 cards in your deck.\r\nDraw it, shuffle the rest into deck, then create an <link=keyword.Ephemeral><sprite name=Ephemeral><style=Keyword>Ephemeral</style></link> copy in hand.",
          descriptionRaw:
            "Pick a follower from the top 4 cards in your deck.\r\nDraw it, shuffle the rest into deck, then create an Ephemeral copy in hand.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: '"Go... surround them..." - Nocturne',
          artistName: "Kudos Productions",
          name: "Stalking Shadows",
          cardCode: "03SI004",
          keywords: ["Burst"],
          keywordRefs: ["Burst"],
          spellSpeed: "Burst",
          spellSpeedRef: "Burst",
          rarity: "RARE",
          rarityRef: "Rare",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Spell",
          collectible: true,
          set: "Set3",
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03MT018.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03MT018-full.png",
            },
          ],
          region: "Targon",
          regionRef: "Targon",
          attack: 2,
          cost: 2,
          health: 2,
          description: "When I'm summoned, draw 1.",
          descriptionRaw: "When I'm summoned, draw 1.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"As leaves unfurl from barren branches, the Lady of Spring sends her messenger to inform the Lord of Winter of the changing season. The messenger\'s bark startles the stars into new places in the sky, while his loyal heart warms the land." \n- Song of the Seasons',
          artistName: "Kudos Productions",
          name: "The Messenger",
          cardCode: "03MT018",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "None",
          rarityRef: "None",
          subtype: "CELESTIAL",
          subtypes: ["CELESTIAL"],
          supertype: "",
          type: "Unit",
          collectible: false,
          set: "Set3",
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03MT034.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03MT034-full.png",
            },
          ],
          region: "Targon",
          regionRef: "Targon",
          attack: 2,
          cost: 0,
          health: 1,
          description: "",
          descriptionRaw: "",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"During Targon\'s first equinox, the people of the mountain attempted their first truce. But as their leaders laid their weapons down, one suddenly cried out in pain! Soldiers drew their spears, and all thoughts of peace were lost. Little did they know the true betrayer was a serpent hidden beneath their feet, forevermore a sign of violent times." \n- Targonian folk tale',
          artistName: "Kudos Productions",
          name: "The Serpent",
          cardCode: "03MT034",
          keywords: ["Challenger"],
          keywordRefs: ["Challenger"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "None",
          rarityRef: "None",
          subtype: "CELESTIAL",
          subtypes: ["CELESTIAL"],
          supertype: "",
          type: "Unit",
          collectible: false,
          set: "Set3",
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03SI012.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03SI012-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 0,
          cost: 3,
          health: 0,
          description:
            "<link=keyword.Obliterate><style=Keyword>Obliterate</style></link> all units that were summoned, but not played, this round.",
          descriptionRaw:
            "Obliterate all units that were summoned, but not played, this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"Of course, death is present in Demacia. We see it take our loved ones and know that, someday, it will come for us. But on these isles... I can almost taste death. I feel it in my lungs as I breathe, I hear it whisper in my ear. It is not some abstract notion. It sits with me here. Now. And it will have us all."\n- Notes of Jens Tommen, historian',
          artistName: "Kudos Productions",
          name: "Passage Unearned",
          cardCode: "03SI012",
          keywords: ["Fast"],
          keywordRefs: ["Fast"],
          spellSpeed: "Fast",
          spellSpeedRef: "Fast",
          rarity: "RARE",
          rarityRef: "Rare",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Spell",
          collectible: true,
          set: "Set3",
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03SI014.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03SI014-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 0,
          cost: 4,
          health: 0,
          description:
            "Grant ALL allies in deck and hand +2|+2 and <link=keyword.Ephemeral><sprite name=Ephemeral><style=Keyword>Ephemeral</style></link>.",
          descriptionRaw:
            "Grant ALL allies in deck and hand +2|+2 and Ephemeral.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"Mind or body, I fear that the nightmares of the Shadow Isles will break us all eventually, and insanity will reign forever."\n- Notes of Jens Tommen, historian',
          artistName: "Kudos Productions",
          name: "Encroaching Shadows",
          cardCode: "03SI014",
          keywords: ["Burst"],
          keywordRefs: ["Burst"],
          spellSpeed: "Burst",
          spellSpeedRef: "Burst",
          rarity: "EPIC",
          rarityRef: "Epic",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Spell",
          collectible: true,
          set: "Set3",
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03SI007.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_8_0/set3/en_us/img/cards/03SI007-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 0,
          cost: 1,
          health: 0,
          description:
            "The next time you summon an ally this round, give it +1|+0 and <link=keyword.SpellShield><sprite name=SpellShield><style=Keyword>SpellShield</style></link> this round.",
          descriptionRaw:
            "The next time you summon an ally this round, give it +1|+0 and SpellShield this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "\"Soon as you step outside the Tooth, you'll feel 'em. Fingertips on your nape, light as rain. Them creatures don't budge when you come at 'em, neither. Ain't afraid of my blade or my torch. Nothin'. Awful things.\" - Whale's Tooth looter",
          artistName: "Kudos Productions",
          name: "Shroud of Darkness",
          cardCode: "03SI007",
          keywords: ["Burst"],
          keywordRefs: ["Burst"],
          spellSpeed: "Burst",
          spellSpeedRef: "Burst",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Spell",
          collectible: true,
          set: "Set3",
        },
      ],
    },
  },
};

App.init();
