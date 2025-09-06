"use server";

import { Client } from "dwolla-v2";

const getEnvironment = (): "sandbox" | "production" => {
  const environment = process.env.DWOLLA_ENV as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

function parseDwollaError(err: any): string {
  try {
    const dwollaMsg =
      err?.body?._embedded?.errors?.[0]?.message ||
      err?.body?.message ||
      err?.message;
    return dwollaMsg || "Unexpected Dwolla error";
  } catch {
    return "Unexpected Dwolla error";
  }
}

export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    const res = await dwollaClient.post(
      `customers/${options.customerId}/funding-sources`,
      {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      }
    );
    return res.headers.get("location");
  } catch (err: any) {
    console.error("Creating a Funding Source Failed: ", err);
    throw new Error(parseDwollaError(err)); 
  }
};

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    return onDemandAuthorization.body._links;
  } catch (err: any) {
    console.error("Creating an On Demand Authorization Failed: ", err);
    throw new Error(parseDwollaError(err));
  }
};

export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  try {
    const res = await dwollaClient.post("customers", newCustomer);
    return res.headers.get("location");
  } catch (err: any) {
    console.error("Creating a Dwolla Customer Failed: ", err);
    throw new Error(parseDwollaError(err)); 
  }
};

export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: { href: sourceFundingSourceUrl },
        destination: { href: destinationFundingSourceUrl },
      },
      amount: { currency: "USD", value: amount },
    };
    const res = await dwollaClient.post("transfers", requestBody);
    return res.headers.get("location");
  } catch (err: any) {
    console.error("Transfer fund failed: ", err);
    throw new Error(parseDwollaError(err));
  }
};

export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    const dwollaAuthLinks = await createOnDemandAuthorization();
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    return await createFundingSource(fundingSourceOptions);
  } catch (err: any) {
    console.error("Adding funding source failed: ", err);
    throw new Error(parseDwollaError(err));
  }
};
