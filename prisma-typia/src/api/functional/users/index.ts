/**
 * @packageDocumentation
 * @module api.functional.users
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";

import type { IUser } from "../../structures/user/user";

/**
 * get user info by user id
 * 
 * @summary user find by user id
 * @tag users
 * @param user_id user id
 * @return user info
 * @throw 404 Not Found
 * 
 * @controller UsersController.getOne
 * @path GET /users/:user_id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getOne(
    connection: IConnection,
    user_id: string,
): Promise<getOne.Output> {
    return PlainFetcher.fetch(
        connection,
        {
            ...getOne.METADATA,
            path: getOne.path(user_id),
        } as const,
    );
}
export namespace getOne {
    export type Output = IUser;

    export const METADATA = {
        method: "GET",
        path: "/users/:user_id",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: null,
    } as const;

    export const path = (user_id: string): string => {
        return `/users/${encodeURIComponent(user_id ?? "null")}`;
    }
}