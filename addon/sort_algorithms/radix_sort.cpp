#include <node_api.h>
#include "sort_algorithms.h"
#include <vector>
#include "../helpers/helpers.h"

namespace addon
{
    int getMax(vector<int> &arr);
    void countingSort(vector<int> &arr, int exp);

    napi_value radix_sort(napi_env env, napi_callback_info info)
    {
        vector<int> elements = get_elements_of_array(env, info);

        int max = getMax(elements);

        // Do counting sort for every digit. Note that instead of passing digit number, exp is passed.
        // exp is 10^i where i is the current digit number
        for (int exp = 1; max / exp > 0; exp *= 10)
            countingSort(elements, exp);

        return convert_to_napi_array(env, elements);
    }

    // A utility function to get the maximum value in an array
    int getMax(vector<int> &arr)
    {
        int max = arr[0];
        for (int i = 1; i < arr.size(); ++i)
        {
            if (arr[i] > max)
                max = arr[i];
        }
        return max;
    }

    // A function to do counting sort of arr[] according to the digit represented by exp
    void countingSort(vector<int> &arr, int exp)
    {
        int n = arr.size();
        vector<int> output(n);
        int count[10] = {0};

        // Store count of occurrences in count[]
        for (int i = 0; i < n; ++i)
            count[(arr[i] / exp) % 10]++;

        // Change count[i] so that count[i] now contains actual position of this digit in output[]
        for (int i = 1; i < 10; ++i)
            count[i] += count[i - 1];

        // Build the output array
        for (int i = n - 1; i >= 0; --i)
        {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        // Copy the output array to arr[], so that arr[] now contains sorted numbers according to the current digit
        for (int i = 0; i < n; ++i)
            arr[i] = output[i];
    }
}