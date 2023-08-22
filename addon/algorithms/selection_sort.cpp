#include <node_api.h>
#include "algorithms.h"
#include <algorithm>
#include <vector>
#include "../helpers/helpers.h"

using namespace std;

namespace addon
{
    napi_value selection_sort(napi_env env, napi_callback_info info)
    {
        vector<int> elements = get_elements_of_array(env, info);

        int n = elements.size();

        for (int i = 0; i < n - 1; ++i)
        {
            // Find the index of the minimum element in the unsorted part
            int minIndex = i;
            for (int j = i + 1; j < n; ++j)
            {
                if (elements[j] < elements[minIndex])
                    minIndex = j;
            }

            // Swap the found minimum element with the first element of the unsorted part
            swap(elements[minIndex], elements[i]);
        }

        return convert_to_napi_array(env, elements);
    }
}