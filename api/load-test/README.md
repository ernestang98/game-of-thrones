### API Non-functional Testing (Load Test)

- Technology:
  - Python & PIP
  - Docker
  - Cicada Distributed/Cicada 2
    - Will decide later on but Cicada Distributed seems like it is better
- Resources:
  - Article on Cicada Distributed
    - [DEV Article](https://dev.to/herzo175/writing-the-cicada-distributed-testing-framework-4p8)
    - [Medium Article](https://medium.com/geekculture/cicada-distributed-major-improvements-27c9ddd092b9)
    - [Cicadad with Selenium](https://faun.pub/selenium-load-tests-with-cicada-distributed-8392250a15c9)
  - [Article on Cicada 2](https://jeremyaherzog.medium.com/cicada-an-integration-testing-framework-for-docker-and-kubernetes-7eee5624cc55)
  - [Cicada Distributed Documentation](https://cicadatesting.github.io/cicada-distributed-docs/)
  - [Cicada 2 Documentation](https://cicadatesting.github.io/cicada-2/)

### Cicadad (Cicada distributed)

- first time `cicada-distributed start-cluster` takes damn long (looks like hanged but not)

- running most command with `cicada-distributed` takes very long...

- If there is any syntax error and stuff, load test will hang at:

  - ```bash
    (base) ernestang98@Ernests-MacBook-Pro load-test % cicada-distributed run
    ======================= Starting Test: cicada-test-eb33c966 =======================
    ```

  - Tried to pull logs from docker containers but to no avail... hard to debug

  - Ensure code has no syntax errors!

- Remember to clear docker containers of instance runs...

	![alt text](./Precaution.png)

### Generate documentation

```
pip install pycco
pycco *py -p -i
```

- [`-i` flag purpose](https://github.com/pycco-docs/pycco/issues/71)

- [PEP 257 -- Docstring Conventions](https://www.python.org/dev/peps/pep-0257/)

- [Pycco documentation](https://realpython.com/generating-code-documentation-with-pycco/)


### Relevant links used:

- Python random string generator for CREATE requests
  - https://www.educative.io/edpresso/how-to-generate-a-random-string-in-python
  - https://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits
