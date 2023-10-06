import dataProvider from '../dataProvider';

export const getRoles = async () => {
  try {
    const response = await dataProvider.getList('roles', {
      pagination: { page: 1, perPage: 0 },
      sort: { field: "id", order: "ASC" }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};