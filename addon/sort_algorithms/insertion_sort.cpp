#include <node_api.h>
#include "sort_algorithms.h"
#include <vector>
#include "../helpers/helpers.h"

namespace addon
{
    napi_value insertion_sort(napi_env env, napi_callback_info info)
    {
        vector<int> elements = get_elements_of_array(env, info);

        int n = elements.size();

        for (int i = 1; i < n; ++i)
        {
            int key = elements[i];
            int j = i - 1;

            // Move elements of arr[0..i-1], that are greater than key,
            // to one position ahead of their current position
            while (j >= 0 && elements[j] > key)
            {
                elements[j + 1] = elements[j];
                --j;
            }
            elements[j + 1] = key;
        }

        return convert_to_napi_array(env, elements);
    }
}