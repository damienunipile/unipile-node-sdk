import { UnipileClient } from "../client.js";
import { config } from "./instance.config.js";

/**
 * @todo Consider https://github.com/Trendyol/jest-testcontainers presets.
 */
//------------------------------------------------------------------------------
describe("EmailResource", () => {
  let client: UnipileClient;
  let account_id: string;
  //   beforeAll(async () => {});
  beforeEach(async () => {
    client = new UnipileClient(config.BASE_URL, config.ACCESS_TOKEN, {
      logRequestPayload: config.logRequestPayload,
      logRequestResult: config.logRequestResult,
      validateRequestPayload: true,
    });

    //retrieve mail accounts
    // const accounts = await client.account.getAll();
    // account_id = accounts.items.filter(
    //   (acc) =>
    //     acc.type === "MAIL" ||
    //     acc.type === "EXCHANGE" ||
    //     acc.type === "GOOGLE_OAUTH" ||
    //     acc.type === "OUTLOOK" ||
    //     acc.type === "ICLOUD",
    // )[0].id;
  });

  //----------------------------------------------------------------------------
  describe("getAll", () => {
    //--------------------------------------------------------------------------
    it(
      "should return return a validated EmailList " +
        "on getAll " +
        "when account_id",
      async () => {
        // try {
        const result = await client.email.getAll({ account_id });
        expect(result.object).toBe("EmailList");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
    //--------------------------------------------------------------------------
    it(
      "should return next page of validated EmailList " +
        "on getAll " +
        "when accountId",
      async () => {
        // try {
        const result = await client.email.getAll({ account_id });
        expect(result.object).toBe("EmailList");
        const result2 = await client.email.getAll({
          cursor: result.cursor ?? "should_not_be_reached_or_broken_test_setup",
        });
        expect(result2.items[0].id).not.toBe(result.items[0].id);
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllFolders", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated FolderList " +
        "on getAllFolders " +
        "when no arguments",
      async () => {
        // try {
        const result = await client.email.getAllFolders();
        expect(result.object).toBe("FolderList");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getOne", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated Email " + "on getOne " + "when mail Id",
      async () => {
        // try {
        const mail = await client.email.getAll({
          account_id,
          limit: 1,
        });
        expect(mail.object).toBe("EmailList");

        const result = await client.email.getOne(mail.items[0].id);
        expect(result.object).toBe("Email");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
});
