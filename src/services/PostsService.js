import api from '@/services/api'
export default {
  fetchPosts () {
    return api().get('posts')
  }
}
