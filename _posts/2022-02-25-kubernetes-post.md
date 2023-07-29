---
title: "Kubernetis"
categories:
  - programming
date: 2021-08-28 01:00:00 +0900
last_modified_at: 2021-08-28 01:00:00 +0900
---

# kubernetis

kubernetis는 여러 container를 관리하는 orchestration program입니다.
컨테이터 오케스트레이터는 많은 서버를 하나처럼 다루는것
k8s kube  
kubectl

https://kubernetes.io/ko/

## 환경설정

### • 설치

kubernetis는 용도에 따라 설치 형태는 아래와 같습니다.
개발을 위한 kubernetis는 docker deskop 또는 minikube로 설치합니다.
**\- docker desktop**
docker desktop (for Mac, for Window)에 kubernetis가 설치되어있습니다.
**\- minikube**
vm 및 container에서는 minikube로 설치합니다.
**\- minikube**

**\- kubespray**
https://kubernetes.io/ko/docs/setup/production-environment/tools/
**\- kubeadm**
kubernetis가 공식적으로 지원하는 클러스터 구축 도구입니다.
https://kubernetes.io/ko/docs/setup/production-environment/tools/kubeadm/

```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
```

```
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
```

```
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list

```

```
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

cgroup(container 어떤거 쓸지?)을 정의해주어야합니다.
https://kubernetes.io/ko/docs/setup/production-environment/container-runtimes/

```
sudo mkdir /etc/docker
cat <<EOF | sudo tee /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF
```

```
sudo systemctl enable docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```

**\- lops**

**\- EKS(Elastic Kubernetes Service) / GKE(Google Kubernetes Engine)**

### • kubelctl

kubernetis api 사용을 위한, cli입니다.

https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands

play-with-k8s.com
katacoda.com

## 클러스터 만들기

### • virtual machine (virtual box)

https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/
master node에서만

```
kubeadm init <args>
```

```
mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

worker node에서

```
kubeadm join --token <token> <control-plane-host>:<control-plane-port> --discovery-token-ca-cert-hash sha256:<hash>
```

kubeadm join 10.0.2.15:6443 --token e1or4g.abgryd5spsk5c886 --discovery-token-ca-cert-hash sha256:57c754ecbfd2afa01ec92eb1ef0af0ac596e2e234e9f73810171ca7a46f050ba

host 이름 달라야함
nat network (nat 아님)
kubeadm reset
kubeadm init
swap -a

### • 설치하기

## node

cluster를 이루는 컴퓨터 단위입니다.

### • node 보기

```
kubectl get nodes
```

## pod

하나의 node에서 실행되는 container들의 집합입니다.
🔎 리눅스 네임스페이스를 공유합니다.

### • pod 만들기

**\- yml**

```yml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
spec:
  containers:
    - name: my-nginx-con
      image: nginx:latest
      ports:
        - containerPort: 80
          protocol: TCP
```

**\- create**
json/yml으로부터 pod에 container를 만들고 실행시킵니다.

```
kubectl create -f [json/yml file]
```

**\- apply**
json/yml에 정의된 형상을 pod에 반영하며, pod이 없다면 container를 만듭니다.

```
kubectl apply -f [json/yml file]
```

### • pod 보기

**\- 전체 pod**

```
kubectl get pods
```

```
kubectl get pods -w -o wide
```

**\- 해당 pod**

```
kubectl describe pods [pod 이름]
```

### • pod 지우기

**\- 해당 pod**

```
kubectl delete -f [json/yml file]
```

```
kubectl delete pods [해당 pod 이름]
```

**\- 전체 pod**

```
kubectl delete pods --all
```

## replica set

pod들의 수를 관리하는 resource입니다.
🔎 label을 기준으로 pod을 관리합니다.

### • replica set 만들기

**\- yml**

```yml
apiVersion: v1
kind: ReplicaSet
metadata:
  name: my-nginx-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-nginx
  template:
    metadata:
      name: my-nginx-pod
      labels:
        app: my-nginx
    spec:
      containers:
        - name: my-nginx-con
          image: nginx:latest
          ports:
            - containerPort: 80
              protocol: TCP
```

**\- create**
json/yml으로부터 replica set을 만들고 실행시킵니다.

```
kubectl create -f [json/yml file]
```

**\- apply**
json/yml에 정의된 형상을 replica set에 반영하며, replicas set이 없다면 container를 만듭니다.

```
kubectl apply -f [json/yml file]
```

### • replica set 보기

**\- 전체 replica set**

```
kubectl get rs
```

```
kubectl get rs -w -o wide
```

**\- 해당 replica set**

```
kubectl describe rs [replica set 이름]
```

### • replica set 지우기

**\- 해당 replica set**

```
kubectl delete -f [json/yml file]
```

```
kubectl delete rs [해당 replica set 이름]
```

**\- 전체 replica set**

```
kubectl delete rs --all
```

### • pod 수 바꾸기

**\- apply**  
replicas set yml의 replicas를 바꾸고, apply를 합니다.

**\- scale**
`kubectl scale rs [replica set 이름] --replicas=[pod 수]`로 바꿉니다.

## deployment

pod 및 replica set의 배포를 관리하는 resource입니다.
🔎 deployment를 만들때 임의의 hash가 붙은 replica set이 만들어집니다.

### • deployment 만들기

**\- yml**

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx-dep
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-nginx
  template:
    metadata:
      name: my-nginx-pod
      labels:
        app: my-nginx
    spec:
      containers:
        - name: my-nginx-con
          image: nginx:latest
          ports:
            - containerPort: 80
              protocol: TCP
```

**\- create**
json/yml으로부터 deployment를 만들고 실행시킵니다.

```
kubectl create -f [json/yml file]
```

**\- apply**
json/yml에 정의된 형상을 deployment에 반영하며, deployment가 없다면 container를 만듭니다.

```
kubectl apply -f [json/yml file]
```

### • deployment 보기

**\- 전체 deployment**

```
kubectl get deploy
```

```
kubectl get deploy -w -o wide
```

**\- 해당 deployment**

```
kubectl describe deploy [deployment 이름]
```

### • deployment 지우기

**\- 해당 deployment**

```
kubectl delete -f [json/yml file]
```

```
kubectl delete deploy [해당 deployment 이름]
```

**\- 전체 deployment**

```
kubectl delete deploy --all
```

### • pod 수 바꾸기

**\- apply**  
replicas set yml의 replicas를 바꾸고, apply를 합니다.

**\- scale**
`kubectl scale rs [replica set 이름] --replicas=[pod 수]`로 바꿉니다.

### • deployment history 관리하기

**\- history 만들기**

```
kubectl apply -f [json/yml file] --record
```

**\- history 보기**

```
kubectl rollout history deploy [deployment 이름]
```

**\- history 돌아가기**

```
kubectl rollout undo deploy [deployment 이름] --to-revision=[해당 history 번호]
```

## service

pod과 외부와의 연결을 관리하는 resource입니다.  
🔎 ClusterIP / NodePort / LoadBalancer가 있습니다.

### • service 만들기

**\- yml**

```yml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx-svc
spec:
  ports:
    - name: web-port
      port: 8080
      targetPort: 80
  selector:
    matchLabels:
      app: my-nginx
  type: ClusterIP
```

**\- create**
json/yml으로부터 service를 만들고 실행시킵니다.

```
kubectl create -f [json/yml file]
```

**\- apply**
json/yml에 정의된 형상을 service를에 반영하며, service가 없다면 container를 만듭니다.

```
kubectl apply -f [json/yml file]
```

### • service 보기

**\- 전체 service**

```
kubectl get svc
```

```
kubectl get svc -w -o wide
```

**\- 해당 service**

```
kubectl describe svc [service 이름]
```

### • service 지우기

**\- 해당 service**

```
kubectl delete -f [json/yml file]
```

```
kubectl delete svc [해당 service 이름]
```

**\- 전체 service**

```
kubectl delete svc --all
```

### • endpoint

**\- endpoint 보기**

```
kubectl get ep
```

## configMap(cm) / secret

cluster 변수들을 저장하는 resource입니다.

### • config / secret 만들기

**\- shell**

```
kubectl create confimap [config map 이름] --from-literal=[key a]=[value a] --from-literal=[key b]=[value b]
```

```
kubectl create secret generic [secret 이름] --from-literal=[key a]=[value a] --from-literal=[key b]=[value b]
```

🔎 secret encoding은 `echo -n "plain text" | base64`로 하며, decoding은 `echo -n "encoded text" | base64 --decode`로 합니다.
**\- file에서 만들기**

**\- yml**

```yml
apiVersion: v1
kind: configMap
metadata:
  name: my-config
data:
  ID: myid
  PASSWORD: mypassword
```

```yml
apiVersion: v1
kind: secret
metadata:
  name: my-secret
data:
  ID: myid
  PASSWORD: asdkl=
```

**\- create**
json/yml으로부터 config map을 만들고 실행시킵니다.

```
kubectl create -f [json/yml file]
```

**\- apply**
json/yml에 정의된 형상을 configMap에 반영하며, configMap이 없다면 configMap을 만듭니다.

```
kubectl apply -f [json/yml file]
```

### • config map / secret 보기

**\- 전체 service**

```
kubectl get configmap
```

```
kubectl get secret
```

### • config map / secret 가져오기

```yml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
spec:
  containers:
    - name: my-nginx-con
      image: nginx:latest
      ports:
        - containerPort: 80
          protocol: TCP
      envFrom:
        - configMapRef:
          name: myconfigmap
```

```yml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
spec:
  containers:
    - name: my-nginx-con
      image: nginx:latest
      ports:
        - containerPort: 80
          protocol: TCP
      envFrom:
        - secretRef:
          name: myconfigmap
```

## storage

pod이 종료되도 data들을 저장합니다.

### • hostPath

노드 안에서 data를 공유하도록 해줍니다. (노드 단위)

```yml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
spec:
  containers:
    - name: my-nginx-con-a
      image: nginx:latest
      ports:
        - containerPort: 80
          protocol: TCP
          - name: my-nginx-con
      volumeMounts:
        - mountPath: /var/logs
    - name: my-nginx-con-b
      image: nginx:latest
      ports:
        - containerPort: 80
          protocol: TCP
      volumeMounts:
        - mountPath: /var/logs
  volumes:
    - name: my-vol
      hostPath: /home/vol
```

### • emptyDir

포드 안에서 data를 공유하도록 해줍니다. (포드 단위)

```yml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
spec:
  containers:
    - name: my-nginx-con-a
      image: nginx:latest
      ports:
        - containerPort: 80
          protocol: TCP
          - name: my-nginx-con
      volumeMounts:
        - mountPath: /var/logs
    - name: my-nginx-con-b
      image: nginx:latest
      ports:
        - containerPort: 80
          protocol: TCP
      volumeMounts:
        - mountPath: /var/logs
  volumes:
    - name: my-vol
      emptyDir: {}
```

### • network volume

### • pv

## scheduler

### • manual

**\- yml**

```yml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
spec:
  containers:
    - name: my-nginx-con
      image: nginx:latest
      ports:
        - containerPort: 80
          protocol: TCP
  nodeName: node-a
```

### • taint / toleration

**\- node taint 만들기**

```sh
$ kubectl taint nodes [node 이름] [key 이름]=[value 이름]:[effect 이름]
```

**\- yml**

```yml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
spec:
  containers:
    - name: my-nginx-con
      image: nginx:latest
      ports:
        - containerPort: 80
          protocol: TCP
  tolerations:
    - key: app
      operator: Equal
      value: blue
      effect: NoSchedule
```

### • node selctor

```yml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
spec:
  containers:
    - name: my-nginx-con
      image: nginx:latest
      ports:
        - containerPort: 80
          protocol: TCP
  nodeSelector:
    key: value
```

### • node affinity

## 참고자료

[• pods](https://kubernetes.io/ko/docs/concepts/workloads/pods/)
[• kubectl cli](https://kubernetes.io/docs/reference/kubectl/)

## cheating sheet

### • 모든 이미지 지우기

```
docker rm -f $(docker ps -a -q)
docker rmi $(docker ps -a -q)
```

kubeadm reset

```
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf
```

///
kubectl create -f go-http-pod.yaml
kubectl delete -f go-http-pod.yaml
kubectl delete pod -all
kubectl delete [pod 이름]
kubectl logs http-go
kubectl get pod
kubectl get pod -o wide
kubectl delete all --all
kubectl explain pods
kubectl port-forward http-go 8888:8080
kubectl get pods --show-labels
kubectl get pod -L
kubectl label pod [pod 이름] [key]=[value]
kubectl label pod [pod 이름] [key]-
kubectl get rs

kubectl sacle rs [replica set 이름] --replicas=[숫자]
kubectl describe [type]
kubectl get deploy [deploy 이름] -o yaml
kubectl path
kubectl get ns

deploy -> replica set -> pod

kubectl rollout

--record=true
--dry-run

namespace 먼저 만들기

service

kubectl api-resoucres: api 종류들(pod, service ...)

```
apiVersion: v1
kind: Pod
metadata:
  name: http-go
spec:
  containers:
  - name: http-go
    image: minhob38/http-go
    ports:
    - containerPort: 8080
```

### • 용어

- kubernetes (k8s, kube)
  orchestartion system
- kube ctl
  kube cli
- node
  kubernetis cluster을 이루는 서버를 가리키는 단위입니다.
- kubelet
  node에서 실행되는 agent로 continer 생성/삭제 및 master/worker node 통신을 담당합니다.
- control plane
  set of containers that manage the cluster
