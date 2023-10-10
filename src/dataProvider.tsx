import { fetchUtils } from "react-admin";
import { authProvider } from "./authProvider";
import { stringify } from "query-string";

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL;
const httpClient = fetchUtils.fetchJson;

export default {
  getResources: () => {
    // Здесь вы должны реализовать логику получения списка ресурсов вашего приложения
    return Promise.resolve([{ name: "users" }, { name: "offices" }]);
  },
  getList: async (resource, params) => {
    console.log("Работает dataProvider getList");
    const { page, perPage } = params.pagination,
      { field, order } = params.sort,
      query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
      },
      { token } = await authProvider.getIdentity(),
      url = `${apiUrl}/${resource}?${stringify(query)}`,
      headers = new Headers();
    headers.set("authorization", token);
    
    console.log("page: " + page);
    console.log("perPage: " + perPage);

    const response = await httpClient(url, { headers }),
      resHeaders = response.headers,
      resData = response.json;
    return {
      data: resData,
      total: parseInt(resHeaders.get("content-range").split("/").pop(), 10),
    };
  },

  getOne: async (resource, params) => {
    console.log("Работает dataProvider getOne");
    const { token } = await authProvider.getIdentity(),
      headers = new Headers();
    headers.set("authorization", token);
    return await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      headers,
    }).then(({ json }) => {
      console.log(json);
      return{ data: json }
    });
  },

  getMany: async (resource, params) => {
    console.log("Работает dataProvider getMany");
    const query = {
        filter: JSON.stringify({ id: params.ids }),
      },
      { token } = await authProvider.getIdentity(),
      url = `${apiUrl}/${resource}?${stringify(query)}`,
      headers = new Headers();

    headers.set("authorization", token);
    return await httpClient(url, { headers }).then(({ json }) => {
      console.log(json);
      return { data: json };
    });
  },

  getManyReference: async (resource, params) => {
    console.log("Работает dataProvider getManyReference");
    const { page, perPage } = params.pagination,
      { field, order } = params.sort,
      query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify({
          ...params.filter,
          [params.target]: params.id,
        }),
      },
      { token } = await authProvider.getIdentity(),
      url = `${apiUrl}/${resource}?${stringify(query)}`,
      headers = new Headers();

    headers.set("authorization", token);

    return httpClient(url, { headers }).then(({ headers, json }) => ({
      data: json,
      total: parseInt(
        (headers.get("content-range") || "0").split("/").pop() || 0,
        10
      ),
    }));
  },

  update: async (resource, params) => {
    console.log("Работает dataProvider update");
    const { token } = await authProvider.getIdentity(),
      headers = new Headers(),
      {
        data: { data: excleudeData, ...restData },
      } = params;
    headers.set("authorization", token);
    console.log(restData);
    return await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(restData),
    }).then(({ json }) => ({ data: json }));
  },

  updateMany: (resource, params) => {
    console.log("Работает dataProvider updateMany");
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: async (resource, params) => {
    console.log("Работает dataProvider create");
    const { token } = await authProvider.getIdentity(),
      headers = new Headers();

    headers.set("authorization", token);
    let endPoint = resource;

    console.log(params);

    if (resource === "users") {
      endPoint = "register";
      if (params.meta.creator_role === 1) {
        endPoint = "create-user";
      }
    }
    if (resource === "offices" && params.meta.creator_role === 1) {
      endPoint = "create-office";
    }

    const { json } = await httpClient(`${apiUrl}/${endPoint}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: headers,
    });
    return {
      data: { ...params.data, id: json.id },
    };
  },

  delete: async (resource, params) => {
    console.log("Работает dataProvider delete");
    const { token } = await authProvider.getIdentity(),
      headers = new Headers();

    headers.set("authorization", token);

    httpClient(`${apiUrl}/${resource}/${params.id}?token=${token}`, {
      method: "DELETE",
      headers: headers,
    }).then((response) => {
      console.log(response);
    });
  },

  deleteMany: (resource, params) => {
    console.log("Работает dataProvider deleteMany");
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }));
  },
};
