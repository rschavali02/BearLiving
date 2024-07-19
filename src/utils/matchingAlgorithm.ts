//Algorithm to match best fit buyers and sellers
type Buyer = {
    email: string;
    preferences: {
      Furnished: number;
      Bathrooms: number;
      Bedrooms: number;
      Roommates: number;
      WasherDryer: number;
      Utilities: number;
      Kitchen: number;
      Parking: number;
      OnStreetParking: number;
      Smoking: number;
      Parties: number;
    };
    priceRange: { min: number; max: number };
    locations: string[];
  };
  
  type Seller = {
    email: string;
    Furnished: string;
    Bathrooms: number;
    Bedrooms: number;
    Roommates: string;
    WasherDryer: string;
    Utilities: string;
    Kitchen: string;
    Parking: string;
    OnStreetParking: string;
    Smoking: string;
    Parties: string;
    price: number;
    locations: string[];
  };
  
  const calculateScore = (buyer: Buyer, seller: Seller) => {
    let score = 0;
  
    const weights = buyer.preferences;
  
    if (seller.Furnished === 'yes') score += weights.Furnished;
    if (Math.abs(seller.Bathrooms - buyer.preferences.Bathrooms) <= 1) score += weights.Bathrooms;
    if (Math.abs(seller.Bedrooms - buyer.preferences.Bedrooms) <= 1) score += weights.Bedrooms;
    if (seller.Roommates === 'yes') score += weights.Roommates;
    if (seller.WasherDryer === 'yes') score += weights.WasherDryer;
    if (seller.Utilities === 'yes') score += weights.Utilities;
    if (seller.Kitchen === 'yes') score += weights.Kitchen;
    if (seller.Parking === 'yes') score += weights.Parking;
    if (seller.OnStreetParking === 'yes') score += weights.OnStreetParking;
    if (seller.Smoking === 'yes') score += weights.Smoking;
    if (seller.Parties === 'yes') score += weights.Parties;
  
    if (buyer.priceRange.min <= seller.price && buyer.priceRange.max >= seller.price) score += 1;
  
    const locationMatch = buyer.locations.filter(loc => seller.locations.includes(loc)).length;
    score += locationMatch * 1;
  
    return score;
  };
  
  export const matchSublets = (buyers: Buyer[], sellers: Seller[]) => {
    return buyers.map(buyer => {
      const scoredSellers = sellers.map(seller => ({
        ...seller,
        score: calculateScore(buyer, seller)
      }));
      //sorting sellers from best to worst
      const sortedSellers = scoredSellers.sort((a, b) => b.score - a.score);
      return {
        buyer: buyer.email,
        recommendedSublets: sortedSellers
      };
    });
  };
  