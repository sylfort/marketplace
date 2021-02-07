var App = {
  init: function () {
    console.log("Inicio do App");

    console.log("init:", this);

    this.elements.createApp();
    this.events.goHome();
    this.events.searchBar();
    this.events.addMyCards();
    this.elements.createCardsContainer();
    this.controllers.renderAllCards();
    this.events.listMyCards();
    this.events.sellMyCards();

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
      };
    },

    goHome: function () {
      App.elements.title.onclick = function () {
        App.controllers.home();
      };
    },

    addToCart: function (el, card) {
      // 'e pq aqui o card nao existe
      el.onclick = function (card) {
        App.store.state.cart = card;
      };
    },

    // containsCard: function (myCards, card) {
    //   var i;
    //   for (i = 0; i < myCards.length; i++) {
    //     if (myCards[i] === card) {
    //       return true;
    //     }
    //   }

    //   return false;
    // },

    // TEM ALGO DE ERRADO AQUI
    // TEM ALGO DE ERRADO AQUI
    // TEM ALGO DE ERRADO AQUI

    addMyCards: function () {
      App.elements.buyBtn.onclick = function (myCards, card) {
        // antes de adicionar verificar se ja existe
        App.store.state.myCards.push(App.store.state.cart);

        // if (App.store.state.myCards.name.includes(card.name)) {
        //   App.store.state.myCards.pop(card);
        // }
        console.log(App.store.state.cart);
        console.log(App.store.state.myCards);
      };
    },

    sellMyCards: function () {
      App.elements.sellBtn.onclick = function (card) {
        App.store.state.myCards.pop(card);
        console.log(App.store.state.myCards);
        App.controllers.my();
      };
    },

    listMyCards: function () {
      App.elements.my.onclick = function () {
        App.controllers.my();
      };
    },
  },

  controllers: {
    my: function (myCards) {
      App.store.state.page = "my";
      App.controllers.home.clearTheClutter;
      this.renderAllCards(myCards);
    },

    // TEM ALGO DE ERRADO AQUI
    // TEM ALGO DE ERRADO AQUI
    // TEM ALGO DE ERRADO AQUI
    home: function (cards) {
      App.store.state.search = "";
      cards = App.store.state.cards;
      App.store.state.page = "home";
      this.clearTheClutter(cards);
      this.renderAllCards(cards);
      console.log(cards);

      // acessa o searchBar e limpa o value = ""
    },

    filterCards: function () {
      // Usa lista de todos os cards
      var cards = App.store.state.cards;

      // se nao tiver pesquisa, retorna todos cards
      if (!App.store.state.search && App.store.state.page == "home") {
        return cards;
      }

      // Se o page == my, usa a lista myCards
      if (!App.store.state.search && App.store.state.page == "my") {
        cards = App.store.state.myCards;
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
      this.renderBuyBtn(divContainer, card);
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

    renderBuyBtn: function (divContainer, card, home, my) {
      // <!-- Button trigger modal -->
      var buyBtn = document.createElement("button");
      buyBtn.type = "button";

      if (App.store.state.page == "my") {
        buyBtn.className = "btn btn-outline-danger btn-sm";
        buyBtn.setAttribute("data-bs-target", "#exampleModal2");
        buyBtn.innerHTML = "Sell";
      } else {
        buyBtn.className = "btn btn-outline-primary btn-sm";
        buyBtn.setAttribute("data-bs-target", "#exampleModal");
        buyBtn.innerHTML = "Buy";
      }

      buyBtn.setAttribute("data-bs-toggle", "modal");
      buyBtn.style.marginLeft = "5px";
      buyBtn.style.marginTop = "4px";

      // Como esse elemento 'e local e nao esta declarado no contexto (App|this.elements), precisa passar como parametro
      // App.events.addToCart(card, buyBtn);

      // o certo 'e criar um listener onclick. Quando voce cria o listener, o js vai "lembrar" o card certo do loop, e vai executar essa funcao sempre que clicar

      // do jeito que estava fazendo, essa funcao 'e chamada de um array, ou seja, em cada item do array ele vai declarar o state.card como o card atual. E o ultimo loop do array 'e o card que vai ser decalarado.
      // App.store.state.cart = card;

      // o certo 'e criar um listener onclick. Quando voce cria o listener, o js vai "lembrar" o card certo do loop, e vai executar essa funcao sempre que clicar
      buyBtn.onclick = function () {
        App.store.state.cart = card;
      };

      divContainer.appendChild(buyBtn);
    },

    // addCart: function ()
  },

  elements: {
    app: document.getElementById("app"),
    searchBar: document.getElementById("searchBar"),
    title: document.getElementById("title"),
    buyBtn: document.getElementById("buyBtn"),
    my: document.getElementById("my"),
    sellBtn: document.getElementById("sellBtn"),
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
      cart: null,
      myCards: [],
      cards: [
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO012T2.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO012T2-full.png",
            },
          ],
          region: "Ionia",
          regionRef: "Ionia",
          attack: 0,
          cost: 3,
          health: 0,
          description: "Give an ally +0|+3 this round.",
          descriptionRaw: "Give an ally +0|+3 this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: "",
          artistName: "SIXMOREVODKA",
          name: "Discipline of Fortitude",
          cardCode: "01IO012T2",
          keywords: ["Burst"],
          keywordRefs: ["Burst"],
          spellSpeed: "Burst",
          spellSpeedRef: "Burst",
          rarity: "None",
          rarityRef: "None",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Spell",
          collectible: false,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01NX020T1", "01NX020T2", "01NX020"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX020T3.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX020T3-full.png",
            },
          ],
          region: "Noxus",
          regionRef: "Noxus",
          attack: 4,
          cost: 3,
          health: 4,
          description:
            "<link=vocab.Play><style=Vocab>Play</style></link> or <link=vocab.Strike><style=Vocab>Strike</style></link>: Create 2 <link=card.create><style=AssociatedCard>Spinning Axe</style></link> in hand.",
          descriptionRaw: "Play or Strike: Create 2 Spinning Axe in hand.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: '"WHAT\'S MY NAME?"',
          artistName: "SIXMOREVODKA",
          name: "Draven",
          cardCode: "01NX020T3",
          keywords: ["Quick Attack", "Overwhelm"],
          keywordRefs: ["QuickStrike", "Overwhelm"],
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
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE031.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE031-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 1,
          cost: 3,
          health: 4,
          description:
            "<link=vocab.RoundEnd><style=Vocab>Round End</style></link>: Grant other allies +1|+1 if an ally died this round.",
          descriptionRaw:
            "Round End: Grant other allies +1|+1 if an ally died this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"Evil has taken the hour, but it will not win the day. Remember our fallen, and wear their memories like armor!"',
          artistName: "SIXMOREVODKA",
          name: "Dawnspeakers",
          cardCode: "01DE031",
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
        },
        {
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
          associatedCardRefs: ["01IO015", "01IO015T2"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO015T1.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO015T1-full.png",
            },
          ],
          region: "Ionia",
          regionRef: "Ionia",
          attack: 5,
          cost: 4,
          health: 5,
          description:
            "When you <link=keyword.Stun><sprite name=Stunned><style=Keyword>Stun</style></link> or <link=keyword.Recall><style=Keyword>Recall</style></link> an enemy, I strike it.",
          descriptionRaw: "When you Stun or Recall an enemy, I strike it.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: '"...always by my side."',
          artistName: "SIXMOREVODKA",
          name: "Yasuo",
          cardCode: "01IO015T1",
          keywords: ["Quick Attack"],
          keywordRefs: ["QuickStrike"],
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
          associatedCardRefs: [
            "01PZ056T10",
            "01PZ056T3",
            "01PZ056T1",
            "01PZ056T4",
            "01PZ056T7",
            "01PZ056T6",
            "01PZ056T8",
            "01PZ056T2",
            "01PZ056T9",
            "01PZ056T5",
            "01PZ015",
          ],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ056.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ056-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 1,
          cost: 5,
          health: 3,
          description:
            "When you cast a spell, create a <link=keyword.Fleeting><sprite name=Fleeting><style=Keyword>Fleeting</style></link> Turret in hand with equal cost. It costs 0 this round.",
          descriptionRaw:
            "When you cast a spell, create a Fleeting Turret in hand with equal cost. It costs 0 this round.",
          levelupDescription:
            "I've seen you summon 12+ Power of Turrets<style=Variable></style>.",
          levelupDescriptionRaw: "I've seen you summon 12+ Power of Turrets.",
          flavorText:
            '"Mad scientist? Pft! I\'m clearly a very-stable-if-slightly-disorganized-and-eclectic scientist, thank you very much!"',
          artistName: "SIXMOREVODKA",
          name: "Heimerdinger",
          cardCode: "01PZ056",
          keywords: ["Imbue"],
          keywordRefs: ["Imbue"],
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
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO020.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO020-full.png",
            },
          ],
          region: "Ionia",
          regionRef: "Ionia",
          attack: 2,
          cost: 2,
          health: 3,
          description: "When I'm summoned, give other allies +1|+0 this round.",
          descriptionRaw:
            "When I'm summoned, give other allies +1|+0 this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"On this day, yours will become the face of discipline, training, humility, and balance. Today, you become Kinkou."',
          artistName: "SIXMOREVODKA",
          name: "Keeper of Masks",
          cardCode: "01IO020",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01FR039", "01FR039T2"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR039T1.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR039T1-full.png",
            },
          ],
          region: "Freljord",
          regionRef: "Freljord",
          attack: 0,
          cost: 8,
          health: 0,
          description:
            "Grant an ally +8|+4.\r\nShuffle a <link=card.level1><style=AssociatedCard>Tryndamere</style></link> into your deck.",
          descriptionRaw:
            "Grant an ally +8|+4.\r\nShuffle a Tryndamere into your deck.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: "“I've been told I have a... temper.” - Tryndamere",
          artistName: "SIXMOREVODKA",
          name: "Tryndamere's Battle Fury",
          cardCode: "01FR039T1",
          keywords: ["Burst"],
          keywordRefs: ["Burst"],
          spellSpeed: "Burst",
          spellSpeedRef: "Burst",
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
          associatedCardRefs: ["01PZ013T1"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ013.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ013-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 3,
          cost: 6,
          health: 3,
          description:
            "<link=keyword.PlaySkillMark><sprite name=PlaySkillMark><style=Keyword>Play</style></link>: Discard your hand. Draw 3. Deal 3 to an enemy unit.",
          descriptionRaw:
            "Play: Discard your hand. Draw 3. Deal 3 to an enemy unit.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "His dreams cost him his hands, yet he persisted. Nothing would stand in his way.",
          artistName: "SIXMOREVODKA",
          name: "Augmented Experimenter",
          cardCode: "01PZ013",
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
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE019.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE019-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 0,
          cost: 3,
          health: 0,
          description: "Reduce the cost of allies in hand by 1.",
          descriptionRaw: "Reduce the cost of allies in hand by 1.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"From the fields to the front in a fortnight. This is what we expect from each and every able body in Demacia." - Garen',
          artistName: "Kudos Productions",
          name: "Mobilize",
          cardCode: "01DE019",
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
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX004.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX004-full.png",
            },
          ],
          region: "Noxus",
          regionRef: "Noxus",
          attack: 0,
          cost: 3,
          health: 0,
          description: "Kill a unit with 3 or less Power.",
          descriptionRaw: "Kill a unit with 3 or less Power.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: "Everyone dies. The weak just die faster.",
          artistName: "Rafael Zanchetin",
          name: "Culling Strike",
          cardCode: "01NX004",
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
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ007.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ007-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 2,
          cost: 3,
          health: 4,
          description:
            "<link=vocab.Support><style=Vocab>Support</style></link>: Shuffle 4 copies of the supported ally into your deck.",
          descriptionRaw:
            "Support: Shuffle 4 copies of the supported ally into your deck.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "The boom of the cannons drew crowds toward the plaza, eager to see the show. It would take them weeks to wash the last of the confetti from their hair.",
          artistName: "SIXMOREVODKA",
          name: "Parade Electrorig",
          cardCode: "01PZ007",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [
            "01PZ056T3",
            "01PZ056T1",
            "01PZ056T4",
            "01PZ056T7",
            "01PZ056T6",
            "01PZ056T8",
            "01PZ056T2",
            "01PZ056T9",
            "01PZ056T5",
            "01PZ015",
            "01PZ056",
          ],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ056T10.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ056T10-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 2,
          cost: 5,
          health: 4,
          description:
            "When you cast a spell, create a <link=keyword.Fleeting><sprite name=Fleeting><style=Keyword>Fleeting</style></link> Turret in hand with equal cost. Grant it +1|+1 and it costs 0 this round.",
          descriptionRaw:
            "When you cast a spell, create a Fleeting Turret in hand with equal cost. Grant it +1|+1 and it costs 0 this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: '"PROGRESSSSS!"',
          artistName: "SIXMOREVODKA",
          name: "Heimerdinger",
          cardCode: "01PZ056T10",
          keywords: ["Imbue"],
          keywordRefs: ["Imbue"],
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
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI038.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI038-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 0,
          cost: 3,
          health: 3,
          description: "When another ally dies, deal 1 to the enemy Nexus.",
          descriptionRaw: "When another ally dies, deal 1 to the enemy Nexus.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "Her cruelest trick wasn't slaughtering the soldiers who trusted the cries of a little girl, but sowing doubt in the survivors who returned home and ignored the pleas of their daughters.",
          artistName: "SIXMOREVODKA",
          name: "Phantom Prankster",
          cardCode: "01SI038",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "RARE",
          rarityRef: "Rare",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01DE042", "01DE042T2"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE042T1.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE042T1-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 0,
          cost: 3,
          health: 0,
          description:
            "Give an ally <link=keyword.Barrier><sprite name=Barrier><style=Keyword>Barrier</style></link> this round.\r\nShuffle a <link=card.level1><style=AssociatedCard>Lux</style></link> into your deck.",
          descriptionRaw:
            "Give an ally Barrier this round.\r\nShuffle a Lux into your deck.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "\"The world can turn its back on you when you're different. People say your differences make you weak--but they make us strong, compassionate. Even in the darkest times, I'll protect you!\" - Lux",
          artistName: "Kudos Productions",
          name: "Lux's Prismatic Barrier",
          cardCode: "01DE042T1",
          keywords: ["Burst"],
          keywordRefs: ["Burst"],
          spellSpeed: "Burst",
          spellSpeedRef: "Burst",
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
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ018.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ018-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 3,
          cost: 2,
          health: 1,
          description: "",
          descriptionRaw: "",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: "How does she aim? That's an excellent question.",
          artistName: "SIXMOREVODKA",
          name: "Academy Prodigy",
          cardCode: "01PZ018",
          keywords: ["Quick Attack"],
          keywordRefs: ["QuickStrike"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO045.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO045-full.png",
            },
          ],
          region: "Ionia",
          regionRef: "Ionia",
          attack: 2,
          cost: 2,
          health: 2,
          description:
            "<link=vocab.Support><style=Vocab>Support</style></link>: Give my supported ally <link=keyword.Lifesteal><sprite name=Lifesteal><style=Keyword>Lifesteal</style></link> this round.",
          descriptionRaw:
            "Support: Give my supported ally Lifesteal this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "\"During winter's reign, we heard the tread of\nFootsteps 'cross the snowy floor. \nIn its wake, new vine and leaf emerged to rearrange\nThe forest floor and herald season's change.\"\n- Shon-Xan poem",
          artistName: "SIXMOREVODKA",
          name: "Herald of Spring",
          cardCode: "01IO045",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO008.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO008-full.png",
            },
          ],
          region: "Ionia",
          regionRef: "Ionia",
          attack: 1,
          cost: 2,
          health: 3,
          description:
            "When you <link=keyword.Stun><sprite name=Stunned><style=Keyword>Stun</style></link> or <link=keyword.Recall><style=Keyword>Recall</style></link> a unit, grant me +2|+0.",
          descriptionRaw: "When you Stun or Recall a unit, grant me +2|+0.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "\"Oh, so you think I'm 'cute'? 'Fuzzy'?? Let's see how 'adorable' you find THIS!\"",
          artistName: "SIXMOREVODKA",
          name: "Fae Bladetwirler",
          cardCode: "01IO008",
          keywords: ["Quick Attack"],
          keywordRefs: ["QuickStrike"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "RARE",
          rarityRef: "Rare",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01NX030", "01NX005", "01NX048", "01NX032"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX048.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX048-full.png",
            },
          ],
          region: "Noxus",
          regionRef: "Noxus",
          attack: 3,
          cost: 3,
          health: 3,
          description:
            "When I survive damage, create a random Crimson unit in your hand.",
          descriptionRaw:
            "When I survive damage, create a random Crimson unit in your hand.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"Beloved companions!" "Were you? Well I received an invitation." "--Reveler\'s Ball! Yes!" "Then we must! I shall present my family." "Starters before dessert, my dear. And you, Kye? Will you attend?"',
          artistName: "SIXMOREVODKA",
          name: "Crimson Curator",
          cardCode: "01NX048",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR006.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR006-full.png",
            },
          ],
          region: "Freljord",
          regionRef: "Freljord",
          attack: 0,
          cost: 5,
          health: 0,
          description:
            "Grant an ally and all allied copies of it <link=vocab.Everywhere><style=Vocab>everywhere</style></link> +2|+2.",
          descriptionRaw:
            "Grant an ally and all allied copies of it everywhere +2|+2.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"We few are Iceborn, our bloodlines infused with the Freljord\'s magic. Our ancestors locked away an ancient evil, and now we few stand guard to defend against its return." - Gregor the Guardian',
          artistName: "SIXMOREVODKA",
          name: "Iceborn Legacy",
          cardCode: "01FR006",
          keywords: ["Slow"],
          keywordRefs: ["Slow"],
          spellSpeed: "Slow",
          spellSpeedRef: "Slow",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Spell",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO022.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO022-full.png",
            },
          ],
          region: "Ionia",
          regionRef: "Ionia",
          attack: 0,
          cost: 1,
          health: 0,
          description:
            "Give an ally <link=keyword.Elusive><sprite name=Elusive><style=Keyword>Elusive</style></link> this round.",
          descriptionRaw: "Give an ally Elusive this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"Stay hidden, and do not return until your task is finished." - Zed',
          artistName: "Kudos Productions",
          name: "Ghost",
          cardCode: "01IO022",
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
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR022.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR022-full.png",
            },
          ],
          region: "Freljord",
          regionRef: "Freljord",
          attack: 1,
          cost: 1,
          health: 1,
          description:
            "When I'm summoned, grant the top 2 allies in your deck +1|+1.",
          descriptionRaw:
            "When I'm summoned, grant the top 2 allies in your deck +1|+1.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"Three times our reavers reached Avarosan gates, and three time they were met with ready bows. What trickery warns them of our attacks?" - Scarthane Steffen',
          artistName: "SIXMOREVODKA",
          name: "Omen Hawk",
          cardCode: "01FR022",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR042.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR042-full.png",
            },
          ],
          region: "Freljord",
          regionRef: "Freljord",
          attack: 0,
          cost: 6,
          health: 0,
          description:
            "<link=keyword.Frostbite><sprite name=Frostbite><style=Keyword>Frostbite</style></link> 2 enemies. ",
          descriptionRaw: "Frostbite 2 enemies. ",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "\"You'd challenge me on my own lands? You're ill-prepared, little one.\" - Anivia",
          artistName: "Kudos Productions",
          name: "Harsh Winds",
          cardCode: "01FR042",
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
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI049.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI049-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 0,
          cost: 2,
          health: 0,
          description: "Kill an ally to draw 2.",
          descriptionRaw: "Kill an ally to draw 2.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"I have erred. We were not meant to peer beyond the pale curtain. Whatever insight lingers there comes at far too great a cost." - Arie Wrence, Dauntless Vindicator',
          artistName: "Kudos Productions",
          name: "Glimpse Beyond",
          cardCode: "01SI049",
          keywords: ["Fast"],
          keywordRefs: ["Fast"],
          spellSpeed: "Fast",
          spellSpeedRef: "Fast",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Spell",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01SI002", "01SI053", "01SI053T2"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI053T1.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI053T1-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 0,
          cost: 1,
          health: 0,
          description:
            "If an ally died this round, summon 2 <link=card.create><style=AssociatedCard>Spiderlings</style></link>.\r\nShuffle a <link=card.level1><style=AssociatedCard>Elise</style></link> into your deck.",
          descriptionRaw:
            "If an ally died this round, summon 2 Spiderlings.\r\nShuffle a Elise into your deck.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "That creeping feeling on your skin isn't nearly as unsettling as the one underneath it.",
          artistName: "Kudos Productions",
          name: "Elise's Crawling Sensation",
          cardCode: "01SI053T1",
          keywords: ["Slow"],
          keywordRefs: ["Slow"],
          spellSpeed: "Slow",
          spellSpeedRef: "Slow",
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
          associatedCardRefs: ["01FR009T1", "01FR009T2", "01FR053"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR009.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR009-full.png",
            },
          ],
          region: "Freljord",
          regionRef: "Freljord",
          attack: 0,
          cost: 3,
          health: 5,
          description: "",
          descriptionRaw: "",
          levelupDescription:
            "I've survived 10 total damage<style=Variable></style>.",
          levelupDescriptionRaw: "I've survived 10 total damage.",
          flavorText:
            '“Papa, tell the one about Braum and his door!”\n"Or when his fall split a mountain in two!"\n"Oh! Whattabout when he saved the tavern from the rampaging yeti?!"',
          artistName: "SIXMOREVODKA",
          name: "Braum",
          cardCode: "01FR009",
          keywords: ["Challenger", "Regeneration"],
          keywordRefs: ["Challenger", "Regeneration"],
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
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI057.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI057-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 7,
          cost: 4,
          health: 7,
          description: "To play me, kill 2 allies.",
          descriptionRaw: "To play me, kill 2 allies.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"Put \'em in the cage, tum-te-dum... \nPluck up every soul, one by one...\nNever let ‘em go, no! No sir…\nElse them spirits make quite a stir..."',
          artistName: "JiHun Lee",
          name: "Ancient Crocolith",
          cardCode: "01SI057",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "RARE",
          rarityRef: "Rare",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE010.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE010-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 5,
          cost: 5,
          health: 4,
          description:
            "<link=keyword.Last Breath><sprite name=LastBreath><style=Keyword>LastBreath</style></link>: Create a random Elite in hand.",
          descriptionRaw: "LastBreath: Create a random Elite in hand.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"It takes a bold heart to trust their life to a silverwing, locked in combat far above solid ground. Bold, and highly durable." - Garen',
          artistName: "SIXMOREVODKA",
          name: "Swiftwing Lancer",
          cardCode: "01DE010",
          keywords: ["Last Breath", "Challenger"],
          keywordRefs: ["LastBreath", "Challenger"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "RARE",
          rarityRef: "Rare",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI023.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI023-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 2,
          cost: 2,
          health: 3,
          description:
            "When you summon an <link=keyword.Ephemeral><sprite name=Ephemeral><style=Keyword>Ephemeral</style></link> ally, grant it +1|+1.",
          descriptionRaw: "When you summon an Ephemeral ally, grant it +1|+1.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "Only the fallen knew that she did not walk alone. Only they could see the countless companions she led down the path to lands beyond.",
          artistName: "SIXMOREVODKA",
          name: "Soul Shepherd",
          cardCode: "01SI023",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ019.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ019-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 2,
          cost: 2,
          health: 1,
          description: "When I'm summoned, refill 2 spell mana.",
          descriptionRaw: "When I'm summoned, refill 2 spell mana.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "Not everyone is cut out to further progress in Piltover immediately. Some need a little guidance--those who look at invention through the wrong lens, for instance.",
          artistName: "SIXMOREVODKA",
          name: "Eager Apprentice",
          cardCode: "01PZ019",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01NX038T2", "01NX038T1"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX038.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX038-full.png",
            },
          ],
          region: "Noxus",
          regionRef: "Noxus",
          attack: 6,
          cost: 6,
          health: 5,
          description: "",
          descriptionRaw: "",
          levelupDescription: "I see the enemy Nexus has 10 or less Health.",
          levelupDescriptionRaw: "I see the enemy Nexus has 10 or less Health.",
          flavorText:
            '"An iron will and a titan\'s strength. There is no finer general to lead the Trifarian Legion." - Jericho Swain\n',
          artistName: "SIXMOREVODKA",
          name: "Darius",
          cardCode: "01NX038",
          keywords: ["Overwhelm"],
          keywordRefs: ["Overwhelm"],
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
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO040.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO040-full.png",
            },
          ],
          region: "Ionia",
          regionRef: "Ionia",
          attack: 2,
          cost: 4,
          health: 2,
          description: "",
          descriptionRaw: "",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"Once, this place held our schools, our temples, our homes. Now, we are left to skulk about its shadow-infested ruins. Zed\'s Order has defiled the legacy of this sacred place--I will be sure they regret it."',
          artistName: "SIXMOREVODKA",
          name: "Kinkou Lifeblade",
          cardCode: "01IO040",
          keywords: ["Lifesteal", "Elusive"],
          keywordRefs: ["Lifesteal", "Elusive"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR018.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01FR018-full.png",
            },
          ],
          region: "Freljord",
          regionRef: "Freljord",
          attack: 3,
          cost: 3,
          health: 2,
          description:
            "<link=vocab.Strike><style=Vocab>Strike</style></link>: If I struck a unit with 0 Power, kill it.",
          descriptionRaw: "Strike: If I struck a unit with 0 Power, kill it.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "Predators of the northern reaches have learned that the easiest prey are those already crippled by winter's bite.",
          artistName: "SIXMOREVODKA",
          name: "Rimefang Wolf",
          cardCode: "01FR018",
          keywords: ["Challenger"],
          keywordRefs: ["Challenger"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "RARE",
          rarityRef: "Rare",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE020.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE020-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 2,
          cost: 2,
          health: 2,
          description: "",
          descriptionRaw: "",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"We didn\'t know who or what those creatures were. But we knew the faces of our fellow soldiers by our sides, and that was all we needed."',
          artistName: "SIXMOREVODKA",
          name: "Vanguard Defender",
          cardCode: "01DE020",
          keywords: ["Tough"],
          keywordRefs: ["Tough"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "ELITE",
          subtypes: ["ELITE"],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE034.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE034-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 2,
          cost: 2,
          health: 2,
          description: "When you summon an Elite, grant it +1|+1.",
          descriptionRaw: "When you summon an Elite, grant it +1|+1.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: "Wars are won in the forge.",
          artistName: "SIXMOREVODKA",
          name: "Battlesmith",
          cardCode: "01DE034",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "RARE",
          rarityRef: "Rare",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE002.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE002-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 7,
          cost: 8,
          health: 7,
          description:
            "When I'm summoned, <link=vocab.Rally><style=Vocab>Rally</style></link>.",
          descriptionRaw: "When I'm summoned, Rally.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "“Our House has bled for this realm. You’ll not throw away this family’s honor for a few tricks of light.”",
          artistName: "SIXMOREVODKA",
          name: "Tianna Crownguard",
          cardCode: "01DE002",
          keywords: ["Tough"],
          keywordRefs: ["Tough"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "EPIC",
          rarityRef: "Epic",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX023.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX023-full.png",
            },
          ],
          region: "Noxus",
          regionRef: "Noxus",
          attack: 5,
          cost: 5,
          health: 3,
          description: "When I'm summoned, grant other Spider allies +2|+0.",
          descriptionRaw: "When I'm summoned, grant other Spider allies +2|+0.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "A single glance and you're hers. A single bite and you're theirs.",
          artistName: "SIXMOREVODKA",
          name: "Arachnoid Host",
          cardCode: "01NX023",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "RARE",
          rarityRef: "Rare",
          subtype: "SPIDER",
          subtypes: ["SPIDER"],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01IO041", "01IO041T2"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO041T1.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01IO041T1-full.png",
            },
          ],
          region: "Ionia",
          regionRef: "Ionia",
          attack: 5,
          cost: 5,
          health: 4,
          description:
            "When you play a spell, cast it again on the same targets.",
          descriptionRaw:
            "When you play a spell, cast it again on the same targets.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: '"We\'ll bring peace to Ionia, whatever the cost."',
          artistName: "SIXMOREVODKA",
          name: "Karma",
          cardCode: "01IO041T1",
          keywords: ["Imbue"],
          keywordRefs: ["Imbue"],
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
          associatedCardRefs: ["01DE012", "01DE012T2"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE012T1.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE012T1-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 6,
          cost: 5,
          health: 6,
          description:
            "<link=vocab.RoundStart><style=Vocab>Round Start</style></link>: <link=vocab.Rally><style=Vocab>Rally</style></link>.",
          descriptionRaw: "Round Start: Rally.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"You think me rigid. Single-minded. Predictable. I am rigid, for nothing can sway me. I am single-minded, for I believe in Demacia. And I am predictable, for I will surely defeat you.”',
          artistName: "SIXMOREVODKA",
          name: "Garen",
          cardCode: "01DE012T1",
          keywords: ["Regeneration"],
          keywordRefs: ["Regeneration"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "None",
          rarityRef: "None",
          subtype: "ELITE",
          subtypes: ["ELITE"],
          supertype: "Champion",
          type: "Unit",
          collectible: false,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE017.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE017-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 0,
          cost: 3,
          health: 0,
          description: "If you have exactly 1 ally, grant it +3|+3.",
          descriptionRaw: "If you have exactly 1 ally, grant it +3|+3.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "When others fail, it falls upon the shoulders of a true hero to find a path to victory.",
          artistName: "Kudos Productions",
          name: "Stand Alone",
          cardCode: "01DE017",
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
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01PZ040T2", "01PZ040T1", "01PZ040T3"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ040.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ040-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 4,
          cost: 4,
          health: 3,
          description: "",
          descriptionRaw: "",
          levelupDescription: "I see your hand is empty.",
          levelupDescriptionRaw: "I see your hand is empty.",
          flavorText:
            '"What\'samatter, Fishbones?"\n"I\'m worried about you, Jinx! Every time you get bored, you..."\n"...want to blow something up! Great idea, Fishbones!"',
          artistName: "SIXMOREVODKA",
          name: "Jinx",
          cardCode: "01PZ040",
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
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX013.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX013-full.png",
            },
          ],
          region: "Noxus",
          regionRef: "Noxus",
          attack: 0,
          cost: 5,
          health: 0,
          description:
            "<link=keyword.Stun><sprite name=Stunned><style=Keyword>Stun</style></link> an enemy. Give all allies +2|+0 this round.",
          descriptionRaw: "Stun an enemy. Give all allies +2|+0 this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"Any fool can throw overwhelming force at the enemy. It takes vision to conceal that force until the decisive moment." - Jericho Swain',
          artistName: "Original Force",
          name: "Decisive Maneuver",
          cardCode: "01NX013",
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
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01DE045T1", "01DE045T2"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE045.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE045-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 3,
          cost: 3,
          health: 3,
          description: "",
          descriptionRaw: "",
          levelupDescription: "I've killed 2 enemies<style=Variable></style>.",
          levelupDescriptionRaw: "I've killed 2 enemies.",
          flavorText:
            '"From arena to tournament, training ground to battleground, I long for a worthy opponent. I will not rest until I know I am the greatest."',
          artistName: "SIXMOREVODKA",
          name: "Fiora",
          cardCode: "01DE045",
          keywords: ["Challenger"],
          keywordRefs: ["Challenger"],
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
          associatedCardRefs: ["01PZ022"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ025.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ025-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 3,
          cost: 3,
          health: 3,
          description:
            "When you cast a spell, plant 3 <link=card.shuffle><style=AssociatedCard>Poison Puffcaps</style></link> on random cards in the enemy deck.",
          descriptionRaw:
            "When you cast a spell, plant 3 Poison Puffcaps on random cards in the enemy deck.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"These any good?"\n"Of course! They\'re all top notch! Spoke to them myself!"\n"Okay hand em--wait what?"\n"Mmhmm! Getting married, this one!"\n"How many have you had...?"\n"--to a barnacle!"',
          artistName: "SIXMOREVODKA",
          name: "Puffcap Peddler",
          cardCode: "01PZ025",
          keywords: ["Imbue"],
          keywordRefs: ["Imbue"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE052.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE052-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 9,
          cost: 9,
          health: 9,
          description:
            "<link=vocab.Play><style=Vocab>Play</style></link> or <link=vocab.Attack><style=Vocab>Attack</style></link>: Give all allies <link=keyword.Barrier><sprite name=Barrier><style=Keyword>Barrier</style></link> this round.",
          descriptionRaw: "Play or Attack: Give all allies Barrier this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"This formation is the basis of our tactics. It requires the faith of each soldier in their shield, and in the shields of their companions. So long as they stand, so too shall our realm." - Garen\n',
          artistName: "SIXMOREVODKA",
          name: "Brightsteel Formation",
          cardCode: "01DE052",
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
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01PZ040T1"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ040T2.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ040T2-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 0,
          cost: 2,
          health: 0,
          description:
            "Deal 4 to the enemy nexus and 1 to all other enemies. <link=keyword.Fleeting><sprite name=Fleeting><style=Keyword>Fleeting</style></link>.",
          descriptionRaw:
            "Deal 4 to the enemy nexus and 1 to all other enemies. Fleeting.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: '"See ya!" - Jinx',
          artistName: "Ben Skutt",
          name: "Super Mega Death Rocket!",
          cardCode: "01PZ040T2",
          keywords: ["Slow", "Fleeting"],
          keywordRefs: ["Slow", "Fleeting"],
          spellSpeed: "Slow",
          spellSpeedRef: "Slow",
          rarity: "None",
          rarityRef: "None",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Spell",
          collectible: false,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01SI053T2", "01SI053T1", "01SI002"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI053.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI053-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 2,
          cost: 2,
          health: 3,
          description:
            "<link=vocab.Attack><style=Vocab>Attack</style></link>: Summon an attacking <link=card.summon><style=AssociatedCard>Spiderling</style></link>.",
          descriptionRaw: "Attack: Summon an attacking Spiderling.",
          levelupDescription:
            "<link=vocab.RoundStart><style=Vocab>Round Start</style></link>: You have 3+ other Spiders.",
          levelupDescriptionRaw: "Round Start: You have 3+ other Spiders.",
          flavorText:
            "Once the head of a powerful Noxian house, Elise's dark ties to the Shadow Isles granted her unnatural youth and beauty in exchange for a few unwitting souls offered in sacrifice. An easy decision.",
          artistName: "SIXMOREVODKA",
          name: "Elise",
          cardCode: "01SI053",
          keywords: ["Fearsome"],
          keywordRefs: ["Fearsome"],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "Champion",
          rarityRef: "Champion",
          subtype: "SPIDER",
          subtypes: ["SPIDER"],
          supertype: "Champion",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE021.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01DE021-full.png",
            },
          ],
          region: "Demacia",
          regionRef: "Demacia",
          attack: 0,
          cost: 3,
          health: 0,
          description: "<link=vocab.Rally><style=Vocab>Rally</style></link>.",
          descriptionRaw: "Rally.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            ' "Everyone\'s gotta face their fears. Lucky you, here I am." - Lucian\n',
          artistName: "Max Grecke",
          name: "Relentless Pursuit",
          cardCode: "01DE021",
          keywords: ["Fast"],
          keywordRefs: ["Fast"],
          spellSpeed: "Fast",
          spellSpeedRef: "Fast",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Spell",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ048T1.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01PZ048T1-full.png",
            },
          ],
          region: "Piltover & Zaun",
          regionRef: "PiltoverZaun",
          attack: 0,
          cost: 0,
          health: 0,
          description:
            "<link=keyword.Obliterate><style=Keyword>Obliterate</style></link> the top 5 cards of your deck to deal 1 to all enemies for each spell obliterated.",
          descriptionRaw:
            "Obliterate the top 5 cards of your deck to deal 1 to all enemies for each spell obliterated.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"I told them that every achievement had its cost. I didn\'t tell them who would pay it." - Corina Veraza',
          artistName: "Kudos Productions",
          name: "Magnum Opus",
          cardCode: "01PZ048T1",
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
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX046T1.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX046T1-full.png",
            },
          ],
          region: "Noxus",
          regionRef: "Noxus",
          attack: 0,
          cost: 0,
          health: 0,
          description:
            "<link=keyword.Stun><sprite name=Stunned><style=Keyword>Stun</style></link> an enemy.",
          descriptionRaw: "Stun an enemy.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText: "It was not the kiss he had in mind.",
          artistName: "Kudos Productions",
          name: "Paralyzing Bite",
          cardCode: "01NX046T1",
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
          associatedCardRefs: [],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX047.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX047-full.png",
            },
          ],
          region: "Noxus",
          regionRef: "Noxus",
          attack: 0,
          cost: 2,
          health: 0,
          description:
            "Deal 1 to an ally to give another ally +2|+2 this round.",
          descriptionRaw:
            "Deal 1 to an ally to give another ally +2|+2 this round.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"It\'s give and take, my dear. You give, and I take." - Vladimir',
          artistName: "SIXMOREVODKA",
          name: "Transfusion",
          cardCode: "01NX047",
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
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01SI024"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI010.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI010-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 0,
          cost: 2,
          health: 0,
          description:
            "Summon 2 <link=card.summon><style=AssociatedCard>Spectral Riders</style></link>.",
          descriptionRaw: "Summon 2 Spectral Riders.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "They live now as they died then: loyal 'til the very end.",
          artistName: "Kudos Productions",
          name: "Onslaught of Shadows",
          cardCode: "01SI010",
          keywords: ["Slow"],
          keywordRefs: ["Slow"],
          spellSpeed: "Slow",
          spellSpeedRef: "Slow",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Spell",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01NX040T1"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX040.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01NX040-full.png",
            },
          ],
          region: "Noxus",
          regionRef: "Noxus",
          attack: 2,
          cost: 1,
          health: 1,
          description:
            "<link=keyword.AttackSkillMark><sprite name=AttackSkillMark><style=Keyword>Attack</style></link>: Deal 1 to the enemy Nexus.",
          descriptionRaw: "Attack: Deal 1 to the enemy Nexus.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            '"Our Shieldbreakers can split a man in two. But the Legion has other talents at its disposal when it requires a more... discreet touch." - Jericho Swain',
          artistName: "SIXMOREVODKA",
          name: "Legion Saboteur",
          cardCode: "01NX040",
          keywords: [],
          keywordRefs: [],
          spellSpeed: "",
          spellSpeedRef: "",
          rarity: "COMMON",
          rarityRef: "Common",
          subtype: "",
          subtypes: [],
          supertype: "",
          type: "Unit",
          collectible: true,
        },
        {
          associatedCards: [],
          associatedCardRefs: ["01SI042", "01SI042T2", "01SI024"],
          assets: [
            {
              gameAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI042T1.png",
              fullAbsolutePath:
                "http://dd.b.pvp.net/1_0_0/set1/en_us/img/cards/01SI042T1-full.png",
            },
          ],
          region: "Shadow Isles",
          regionRef: "ShadowIsles",
          attack: 5,
          cost: 6,
          health: 6,
          description:
            "<link=keyword.Ephemeral><sprite name=Ephemeral><style=Keyword>Ephemeral</style></link> allies have +3|+0.\r\n<link=vocab.Attack><style=Vocab>Attack</style></link>: Summon 2 attacking <link=card.summon><style=AssociatedCard>Spectral Riders</style></link>.",
          descriptionRaw:
            "Ephemeral allies have +3|+0.\r\nAttack: Summon 2 attacking Spectral Riders.",
          levelupDescription: "",
          levelupDescriptionRaw: "",
          flavorText:
            "Listen. Hear him ride. The trampling of hooves. The creak of armor, long-worn and rusted. The ghostly cries of soldiers, echoes of the past. The resounding silence that follows.",
          artistName: "SIXMOREVODKA",
          name: "Hecarim",
          cardCode: "01SI042T1",
          keywords: ["Overwhelm"],
          keywordRefs: ["Overwhelm"],
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
      ],
    },
  },
};

App.init();
