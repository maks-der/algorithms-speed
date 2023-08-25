#include <node_api.h>
#include "sort_algorithms.h"
#include <vector>
#include "../helpers/helpers.h"

namespace addon
{
    napi_value bubble_sort(napi_env env, napi_callback_info info)
    {
        vector<int> elements = get_elements_of_array(env, info);

        int n = elements.size();
        for (int i = 0; i < n - 1; ++i)
        {
            for (int j = 0; j < n - i - 1; ++j)
            {
                if (elements[j] > elements[j + 1])
                    swap(elements[j], elements[j + 1]);
            }
        }

        return convert_to_napi_array(env, elements);
    }
}