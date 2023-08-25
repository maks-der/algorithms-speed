#include <node_api.h>
#include <vector>
#include "../helpers/helpers.h"

namespace addon
{

    napi_value binary_search(napi_env env, napi_callback_info info)
    {
        napi_value result;

        vector<int> array = get_elements_of_array(env, info);
        int target = get_searched_int(env, info);

        int left = 0;
        int right = array.size() - 1;

        while (left <= right)
        {
            int mid = left + (right - left) / 2;

            if (array[mid] == target)
            {
                napi_create_int32(env, mid, &result);
                return result;
            }
            else if (array[mid] < target)
            {
                left = mid + 1;
            }
            else
            {
                right = mid - 1;
            }
        }

        napi_create_int32(env, -1, &result);
        return result;
    }
}
