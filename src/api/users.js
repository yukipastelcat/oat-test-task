import apiClient from '../core/api-client'

/**
 * @see https://hr.oat.taocloud.org/api/#/user/get_users
 */
export const getUsers = async (limit, offset, name) => {
  const { data } = await apiClient({
    method: 'get',
    url: '/users',
    params: {
      limit,
      offset,
      name
    }
  })

  return data
}

/**
 * @see https://hr.oat.taocloud.org/api/#/user/get_user__userId_
 */
export async function getUser (userId) {
  const { data } = await apiClient({
    method: 'get',
    url: `user/${userId}`
  })

  return data
}
