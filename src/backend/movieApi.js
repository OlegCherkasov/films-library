import http from './http'

export async function getFilms(page) {
  try {
    const response = await http.get(`discover/movie`, {
      params: {
        page,
        'language': 'en-US',
        'sort_by': 'revenue.desc',
      }
    });
    return response.data.results
  } catch (error) {
    console.error(error);
  }
}

export async function getPopularFilms(page) {
  try {
    const response = await http.get(`movie/popular`, {
      params: {
        page,
        'language': 'en-US',
      }
    });
    return response.data.results
  } catch (error) {
    console.error(error);
  }
}

export async function getSearchFilmId(id) {
  try {
    const response = await http.get(`movie/${id}`, {
      params: {
        'language': 'en-US',
      },
    });
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export async function getSearchFilm(page, wordSearch) {
  try {
    const response = await http.get('search/movie', {
      params: {
        'query': wordSearch,
        'language': 'en-US',
        page,
      },
    });
    return {
      results: response.data.results,
      pages: response.data.total_pages
    }
  } catch (error) {
    console.error(error);
  }
}

