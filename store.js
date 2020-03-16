export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }
  updateDiscounts() {
    this.discountOffers = this.discountOffers.map((item) => {
      let { discountInPercent, partnerName, expiresIn } = item;

      // If more than 50% no need to go for check and directly return offer.
      if (discountInPercent < 50) {
        switch (partnerName) {
          case "Naturalia": {
            // DEFAULT REVERSE
            if (expiresIn < 0) {
              discountInPercent = discountInPercent + discountInPercent;
            } else {
              discountInPercent = discountInPercent + 1;
            }
            break;
          }
          case "Vinted": {
            // Special Case: discount drops to zero when expired, and increases at end of each day
            // when 10 or less days left is increases by 2 percent unit
            // when 5 days or less left for expire it increases by 3 percent unit
            if (expiresIn > 0) {
              if (expiresIn < 11 && expiresIn > 5) {
                discountInPercent = discountInPercent + 2;
              } else if (expiresIn < 6) {
                discountInPercent = discountInPercent + 3;
              } else {
                discountInPercent = discountInPercent + 1;
              }
            } else {
              discountInPercent = 0;
            }
            break;
          }
          case "Ilek": {
            // Ilek nothing to do this one.
            break;
          }
          // New partner
          case "BackMarket": {
            // New partner with discount decrease twice faster than default case.
            if (expiresIn < 0) {
              discountInPercent = (discountInPercent - discountInPercent) * 2;
            } else {
              discountInPercent = discountInPercent - discountInPercent;
            }
            break;
          }
          default: {
            // DEFAULT: discount decrease by 1 percent unit, if expired than twice faster.
            if (expiresIn < 0) {
              discountInPercent = discountInPercent - discountInPercent;
            } else {
              discountInPercent = discountInPercent - 1;
            }
            break;
          }
        }
        // decrementing at end of each day.
        expiresIn = expiresIn - 1;
        return { discountInPercent, partnerName, expiresIn };
      } else {
        // decrementing at end of each day.
        expiresIn = expiresIn - 1;
        return { discountInPercent, partnerName, expiresIn };
      }
    });

    return this.discountOffers;
  }
}
