import Dexie from "dexie";
import Category from "./category";
import Transaction from "./transaction";
import User from "./user";
import { dexieCloud } from "dexie-cloud-addon";

class FinDexie extends Dexie {
  constructor() {
    super("fin-dexie", {
      addons: [dexieCloud],
    });

    this.version(1).stores({
      categories: "@id,name,type", // Primary key and indexed props
      transactions:
        "@id,amount,transaction_date,type,description,nfc_e_number,category_id", // Primary key and indexed props
      user: "@id,email,name,locale,timezone,profile_picture",
    });

    this.categories = this.table("categories");
    this.transactions = this.table("transactions");
    this.user = this.table("user");

    this.cloud.configure({
      databaseUrl: process.env.NEXT_PUBLIC_DEXIE_CLOUD_URL || "",
      requireAuth: false,
      customLoginGui: true,
    });
  }

  // Define the tables
  categories: Dexie.Table<Category, number>;
  transactions: Dexie.Table<Transaction, number>;
  user: Dexie.Table<User, number>;
}

export const db = new FinDexie();
