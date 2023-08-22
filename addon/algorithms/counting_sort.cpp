#include <node_api.h>
#include "algorithms.h"
#include <vector>
#include "../helpers/helpers.h"
#include <algorithm>

using namespace std;

namespace addon
{
    void countingSort(std::vector<int> &arr);

    napi_value counting_sort(napi_env env, napi_callback_info info)
    {
        vector<int> elements = get_elements_of_array(env, info);

        countingSort(elements);

        return convert_to_napi_array(env, elements);
    }

    void countingSort(std::vector<int> &arr)
    {
        int n = arr.size();

        // Find the range of input elements
        int maxElement = *std::max_element(arr.begin(), arr.end());
        int minElement = *std::min_element(arr.begin(), arr.end());
        int range = maxElement - minElement + 1;

        // Create a count array to store the frequency of each element
        std::vector<int> count(range, 0);

        // Count the occurrences of each element
        for (int num : arr)
        {
            count[num - minElement]++;
        }

        // Update the count array to store the positions of elements in the output array
        for (int i = 1; i < range; ++i)
        {
            count[i] += count[i - 1];
        }

        // Build the output array using the count array
        std::vector<int> output(n);
        for (int i = n - 1; i >= 0; --i)
        {
            output[count[arr[i] - minElement] - 1] = arr[i];
            count[arr[i] - minElement]--;
        }

        // Copy the sorted output back to the original array
        arr = output;
    }
}