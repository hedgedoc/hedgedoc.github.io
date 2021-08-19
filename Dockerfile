FROM node:16-slim AS builder

WORKDIR /build

# Fetch hugo extended release and store it to /tmp/hugo
RUN apt-get update -yq && \
    apt-get install wget -yq
RUN wget -O /tmp/hugo.tgz https://github.com/gohugoio/hugo/releases/download/v0.87.0/hugo_extended_0.87.0_Linux-64bit.tar.gz && \
    tar -xzvf /tmp/hugo.tgz -C /tmp

# Install js dependencies and update releases from GitHub
COPY package.json yarn.lock *.ts ./
RUN mkdir -p content/english/releases && \
    yarn install --frozen-lockfile

# Build webpage with given base url
COPY . ./
ARG BASE_URL=https://hedgedoc.org
RUN /tmp/hugo -b "${BASE_URL}"

# Copy build to go-static server image
FROM pierrezemb/gostatic:latest
COPY --from=builder /build/public /srv/http

