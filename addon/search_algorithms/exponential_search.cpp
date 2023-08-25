#include <vector>
#include <node_api.h>
#include <algorithm>
#include "../helpers/helpers.h"

namespace addon
{
    int binarySearch(const std::vector<int> &arr, int target, int left, int right);

    napi_value exponential_search(napi_env env, napi_callback_info info)
    {
        napi_value result;

        vector<int> array = get_elements_of_array(env, info);
        int target = get_searched_int(env, info);

        if (array[0] == target)
            return 0;

        int i = 1;
        while (i < array.size() && array[i] <= target)
        {
            i *= 2; // Double the index to expand the search range
        }

        int search_result = binarySearch(array, target, i / 2, std::min(i, static_cast<int>(array.size() - 1)));
        napi_create_int32(env, search_result, &result);
        return result;
    }

    int binarySearch(const std::vector<int> &arr, int target, int left, int right)
    {
        while (left <= right)
        {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target)
            {
                return mid; // Return the index where target is found
            }
            else if (arr[mid] < target)
            {
                left = mid + 1; // Search in the right half
            }
            else
            {
                right = mid - 1; // Search in the left half
            }
        }

        return -1; // Return -1 if target is not found in the vector
    }
}
