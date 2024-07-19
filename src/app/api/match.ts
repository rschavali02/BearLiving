//Connection Google Sheets API data to my backend and calling matchingAlgorithmn to calc scores
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSheetData } from '../../utils/googleSheets';
import { matchSublets } from '../../utils/matchingAlgorithm';
import { connectToDatabase } from '../../utils/mongoDB';
import { sendEmail } from '../../utils/emailSender';

const BUYER_SHEET_ID = '1wLNKOKSkWeCaBb74iSeHgT52U-6DoD-J8eUiYmCUM5g';
const SELLER_SHEET_ID = '1dlHlLYAaHeDgFN9slA7saUUvq_ICULzR9kwBaarYCTI';

type RawBuyerData = [
  string, number, number, number, number, number, number, number, number, number, number, number, number, number, string
];

type RawSellerData = [
  string, string, number, number, string, string, string, string, string, string, string, string, number, string
];

//Transpose Rows to Columns
const getColumn = (data: any[][], colIndex: number): any[] => {
    return data.map(row => row[colIndex]);
  };

const transformBuyerData = (data: RawBuyerData[]) => {
  // Transform raw data into Buyer type
    // Ensure all data is mapped properly
  return data.map(row => ({
    email: row[0],
    preferences: {
      Furnished: row[1],
      Bathrooms: row[2],
      Bedrooms: row[3],
      Roommates: row[4],
      WasherDryer: row[5],
      Utilities: row[6],
      Kitchen: row[7],
      Parking: row[8],
      OnStreetParking: row[9],
      Smoking: row[10],
      Parties: row[11],
    },
    priceRange: { min: row[12], max: row[13] },
    locations: row[14].split(','),
  }));
};

const transformSellerData = (data: RawSellerData[]) => {
  // Transform raw data into Seller type
  // Ensure all data is mapped properly
  return data.map(row => ({
    email: row[0],
    Furnished: row[1],
    Bathrooms: row[2],
    Bedrooms: row[3],
    Roommates: row[4],
    WasherDryer: row[5],
    Utilities: row[6],
    Kitchen: row[7],
    Parking: row[8],
    OnStreetParking: row[9],
    Smoking: row[10],
    Parties: row[11],
    price: row[12],
    locations: row[13].split(','),
  }));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  try {
    const buyersRawData = await getSheetData(BUYER_SHEET_ID, 'Sheet1!A1:O1000');
    const sellersRawData = await getSheetData(SELLER_SHEET_ID, 'Sheet1!A1:N1000');

    const buyers = transformBuyerData(buyersRawData as RawBuyerData[]);
    const sellers = transformSellerData(sellersRawData as RawSellerData[]);

    const recommendations = matchSublets(buyers, sellers);

    // Example: Sending email to the first buyer (extend this logic as needed)
    const buyer = buyers[0]; // Example: getting the first buyer
    const recommendedSublets = recommendations[0].recommendedSublets;

    const emailText = recommendedSublets.map((sublet, index) => {
      return `${index + 1}. Email: ${sublet.email}, Score: ${sublet.score}`;
    }).join('\n');

    await sendEmail(buyer.email, 'Your Sublet Recommendations', emailText);

    res.status(200).json({ message: 'Recommendations sent via email' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
